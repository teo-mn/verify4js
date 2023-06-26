import * as pdfjs from "pdfjs-dist";
import { ArrayBufferToString, extractHash } from "./pdfUtils";
import { MetaDataInterface, VerifyResultInterface } from "./interfaces";
import {
  requestCertificationByHash,
  requestIssuerByAddress,
  requestUniversityCertByHash,
} from "./blockchainServices";
import { jsonWrap } from "./jsonUtils";
import { log } from "console";
import { Certificate } from "crypto";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const defaultMetadata: MetaDataInterface = {
  issuer: {
    name: "",
    address: "",
  },
  info: {
    name: "",
    desc: "",
    certNum: "",
    additionalInfo: "",     
  },
  version: "",
  blockchain: {
    network: "",
    smartContractAddress: "",
  },
  univ_meta: {},
};

const defaultResult: VerifyResultInterface = {
  state: "INVALID",
  metadata: defaultMetadata,
  issuer: {},
  isUniversity: false,
  isTestnet: true,
  cert: {},
};

export const verify = async (
  pdfArrayBuffer: Int8Array,
  nodeUrl: string = ""
) => {
  const pdfJSDocument = await pdfjs
    .getDocument(pdfArrayBuffer)
    .promise.catch((err: any) => {
      console.error(err);
      throw new Error("PDF файлыг задлахад алдаа гарлаа.");
    });

  const pdfJSMetadata = await pdfJSDocument.getMetadata();
  // @ts-ignore
  const issuerMeta = await extractMetadata(pdfJSMetadata.info);
  let pdfString = ArrayBufferToString(pdfArrayBuffer);

  return _validateInner(issuerMeta, pdfString, nodeUrl);
};

const availableContracts: string[] = [
  "0x5d305D8423c0f07bEaf15ba6a5264e0c88fC41B4",
  "0xcc546a88db1af7d250a2f20dee42ec436f99e075",
  "0xc0668aC1BE4393F9dA6c8eB81a24faA4F9B04Edb",
  "0xD882B76106d0Ba1a54DE30d620dC5c2892Ae1677",
];

export const extractMetadata = async (pdfInfo: {
  Custom: { verifymn: string };
}) => {
  // Extracts the relevant metadata of the vPDF from
  // the PDFJS parsed metadata
  const pdfCustomMetadata = pdfInfo.Custom;
  if (!pdfCustomMetadata) return defaultMetadata;
  const verifymn = pdfCustomMetadata.verifymn;
  if (!verifymn) {
    return defaultMetadata;
  }
  return JSON.parse(verifymn);
};

async function _validateInner(
  metadata: MetaDataInterface,
  pdfString: string,
  nodeUrl: string
) {
  let PDFHash = await extractHash(pdfString);
  let isValid = true;  
  let result: VerifyResultInterface = { ...defaultResult, metadata: metadata };
  try {
    const isTestnet = metadata["blockchain"]["network"] !== "CorexMain";
    result.isTestnet = isTestnet;
    const smartContractAddress = metadata.blockchain.smartContractAddress;
    const version = metadata["version"];
    // @ts-ignore
    // const availableContracts = window.env.REACT_APP_AVAILABLE_CONTRACT_ADDRESSES;
    if (
      !availableContracts.find(
        (x: string) => x.toLowerCase() === smartContractAddress.toLowerCase()
      )
    ) {
      isValid = false;
    } else {
      if (version.includes("university")) {
        return _validateUniversity(PDFHash, metadata, isTestnet, nodeUrl);
      }
      const certification = await requestCertificationByHash(
        PDFHash,
        smartContractAddress,
        isTestnet,
        nodeUrl
      );
      console.log("Certifaction: ", certification);
      console.log("PDFHash: ", PDFHash);

      if (certification.hash !== PDFHash) {
        isValid = false;
      } else {
        if (certification.isRevoked) {
          result.state = "REVOKED";
        } else {
          const expireDate = parseInt(certification.expireDate) * 1000 || 0;
          const now = new Date().getTime();
          if (expireDate !== 0 && now > expireDate) {
            result.state = "EXPIRED";
          } else {
            result.state = "ISSUED";
          }
        }
        result.cert = certification;
        try {
          result.issuer = await requestIssuerByAddress(
            certification.issuer,
            isTestnet,
            nodeUrl
          );
          if (!isTestnet && !result.issuer.isActive) {
            isValid = false;
          }
        } catch (e) {
          isValid = false;
          console.error(e);
        }
      }
    }
  } catch (e) {
    console.error(e);
    throw new Error("Баталгаажуулах явцад алдаа гарлаа.");
  }
  if (!isValid) {
    result.state = "INVALID";
  }
  return result;
}

async function _validateUniversity(
  PDFHash: string,
  metadata: MetaDataInterface,
  isTestnet: boolean,
  nodeUrl: string
) {
  const univMeta = jsonWrap(metadata["univ_meta"]);
  let result: VerifyResultInterface = {
    ...defaultResult,
    isTestnet: isTestnet,
    isUniversity: true,
    metadata: metadata,
  };
  const utf8 = require("utf8");
  const x = utf8.encode(univMeta);
  const metaHash = await extractHash(x);
  const certInfo = await requestUniversityCertByHash(
    PDFHash,
    metadata.blockchain.smartContractAddress,
    isTestnet,
    nodeUrl
  );
  if (certInfo.cert.metaHash.toLowerCase() !== metaHash.toLowerCase()) {
    throw new Error("Блокчэйн сүлжээнд баталгаажаагүй байна.");
  }
  console.log("Hash matched");
  console.log(certInfo);
  // if (!certInfo.approveInfo.isApproved) {
  //   throw new Error('Блокчэйн сүлжээнд баталгаажаагүй байна.');
  // }
  if (!certInfo.approveInfo.isApproved) {
    result.state = "APPROVE_PENDING";
  } else if (certInfo.revokeInfo.isRevoked) {
    result.state = "REVOKED";
  } else {
    const expireDate = parseInt(certInfo.cert.expireDate) * 1000 || 0;
    const now = new Date().getTime();
    if (expireDate !== 0 && now > expireDate) {
      result.state = "EXPIRED";
    } else {
      result.state = "ISSUED";
    }
  }
  result.cert = certInfo.cert;

  try {
    result.issuer = await requestIssuerByAddress(
      certInfo.cert.issuer,
      isTestnet,
      nodeUrl
    );
  } catch (e) {
    console.error(e);
    throw new Error("Баталгаажуулагчийн мэдээлэл авахад алдаа гарлаа.");
  }
  // үндсэн сүлжээнд зөвхөн баталгаажсан байгууллагын мэдээллийг хүчинтэй харуулна
  if (!isTestnet && !result.issuer.isActive) {
    result.state = "INVALID";
  }

  return result;
}
