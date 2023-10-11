import Web3 from 'web3';
// @ts-ignore
import { abi as CertifyAbi } from './abi/certify';
// @ts-ignore
import { abi as UniversityAbi } from './abi/university';
// @ts-ignore
import { abi as IssuerAbi } from './abi/issuer';

export const DEFAULT_NODE_URL_TESTNET = 'https://node-testnet.teo.mn';  
export const DEFAULT_NODE_URL = 'https://node.teo.mn';
export const DEFAULT_ISSUER_ADDRESS_TESTNET = '0x9dca2a5a5412C32930d6CAf8DC1e6c7C2DCd3483';
export const DEFAULT_ISSUER_ADDRESS = '0x824B721ceaf50e66281c905F0e79F3EE45D52613';


export const requestCertificationByHash = async (hash: string, contractAddress: string, isTestnet: boolean, nodeUrl: string) => {
  const url = nodeUrl || (isTestnet ? DEFAULT_NODE_URL_TESTNET : DEFAULT_NODE_URL);
  const client = new Web3(url);
  const contract = new client.eth.Contract(CertifyAbi, client.utils.toChecksumAddress(contractAddress));
  return await contract.methods.getCertification(hash).call();
};

export const requestIssuerByAddress = async (addr: string, isTestnet: boolean, nodeUrl: string) => {
  const contractAddress = isTestnet ? DEFAULT_ISSUER_ADDRESS_TESTNET : DEFAULT_ISSUER_ADDRESS;
  const url = nodeUrl || (isTestnet ? DEFAULT_NODE_URL_TESTNET : DEFAULT_NODE_URL);
  const client = new Web3(url);
  const contract = await new client.eth.Contract(IssuerAbi, client.utils.toChecksumAddress(contractAddress));
  return await contract.methods.getIssuer(client.utils.toChecksumAddress(addr)).call();
};

export const requestUniversityCertByHash = async (hash: string, contractAddress: string, isTestnet: boolean, nodeUrl: string) => {
  const url = nodeUrl || (isTestnet ? DEFAULT_NODE_URL_TESTNET : DEFAULT_NODE_URL);
  const client = new Web3(url);
  const contract = new client.eth.Contract(UniversityAbi, client.utils.toChecksumAddress(contractAddress));
  const cert = await contract.methods.getCertification(hash).call();
  const revokeInfo = await contract.methods.getRevokeInfo(hash).call();
  const approveInfo = await contract.methods.getApproveInfo(hash).call();
  return {
    cert, revokeInfo, approveInfo
  };
};

export const requestCertificationByCertNum = async (certNum: string, contractAddress: string, isTestnet: boolean, nodeUrl: string) => {
  const url = nodeUrl || (isTestnet ? DEFAULT_NODE_URL_TESTNET : DEFAULT_NODE_URL);
  const client = new Web3(url);
  const contract = new client.eth.Contract(UniversityAbi, client.utils.toChecksumAddress(contractAddress));
  const cert = await contract.methods.getCertificationByCertNum(certNum).call();
  const revokeInfo = await contract.methods.getRevokeInfo(cert.hash).call();
  const approveInfo = await contract.methods.getApproveInfo(cert.hash).call();
  return {
    cert, revokeInfo, approveInfo
  };
};

export const requestCertifyCertificationByCertNum = async (certNum: string, contractAddress: string, isTestnet: boolean, nodeUrl: string) => {
  const url = nodeUrl || (isTestnet ? DEFAULT_NODE_URL_TESTNET : DEFAULT_NODE_URL);
  const client = new Web3(url);
  const contract = new client.eth.Contract(CertifyAbi, client.utils.toChecksumAddress(contractAddress));
  return await contract.methods.getCertificationByCertNum(certNum).call();
};
