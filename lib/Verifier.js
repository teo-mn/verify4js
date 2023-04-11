"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.extractMetadata = exports.verify = void 0;
var pdfjs = __importStar(require("pdfjs-dist"));
var pdfUtils_1 = require("./pdfUtils");
var blockchainServices_1 = require("./blockchainServices");
var jsonUtils_1 = require("./jsonUtils");
pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(pdfjs.version, "/pdf.worker.js");
var defaultMetadata = {
    issuer: {
        name: '',
        address: ''
    },
    info: {
        name: '',
        desc: '',
        certNum: '',
        additionalInfo: ''
    },
    version: '',
    blockchain: {
        network: '',
        smartContractAddress: ''
    },
    univ_meta: {}
};
var defaultResult = {
    state: 'INVALID',
    metadata: defaultMetadata,
    issuer: {},
    isUniversity: false,
    isTestnet: true,
    cert: {}
};
var verify = function (pdfArrayBuffer, nodeUrl) {
    if (nodeUrl === void 0) { nodeUrl = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pdfJSDocument, pdfJSMetadata, issuerMeta, pdfString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pdfjs.getDocument(pdfArrayBuffer).promise["catch"](function (err) {
                        console.error(err);
                        throw new Error('PDF файлыг задлахад алдаа гарлаа.');
                    })];
                case 1:
                    pdfJSDocument = _a.sent();
                    return [4 /*yield*/, pdfJSDocument.getMetadata()];
                case 2:
                    pdfJSMetadata = _a.sent();
                    return [4 /*yield*/, (0, exports.extractMetadata)(pdfJSMetadata.info)];
                case 3:
                    issuerMeta = _a.sent();
                    pdfString = (0, pdfUtils_1.ArrayBufferToString)(pdfArrayBuffer);
                    return [2 /*return*/, _validateInner(issuerMeta, pdfString, nodeUrl)];
            }
        });
    });
};
exports.verify = verify;
var availableContracts = ['0x5d305D8423c0f07bEaf15ba6a5264e0c88fC41B4',
    '0xcc546a88db1af7d250a2f20dee42ec436f99e075',
    '0xc0668aC1BE4393F9dA6c8eB81a24faA4F9B04Edb', '0xD882B76106d0Ba1a54DE30d620dC5c2892Ae1677'];
var extractMetadata = function (pdfInfo) { return __awaiter(void 0, void 0, void 0, function () {
    var pdfCustomMetadata, verifymn;
    return __generator(this, function (_a) {
        pdfCustomMetadata = pdfInfo.Custom;
        if (!pdfCustomMetadata)
            return [2 /*return*/, defaultMetadata];
        verifymn = pdfCustomMetadata.verifymn;
        if (!verifymn) {
            return [2 /*return*/, defaultMetadata];
        }
        return [2 /*return*/, JSON.parse(verifymn)];
    });
}); };
exports.extractMetadata = extractMetadata;
function _validateInner(metadata, pdfString, nodeUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var PDFHash, isValid, result, isTestnet, smartContractAddress_1, version, certification, expireDate, now, _a, e_1, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, pdfUtils_1.extractHash)(pdfString)];
                case 1:
                    PDFHash = _b.sent();
                    isValid = true;
                    result = __assign(__assign({}, defaultResult), { metadata: metadata });
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 10, , 11]);
                    isTestnet = metadata['blockchain']['network'] !== 'CorexMain';
                    result.isTestnet = isTestnet;
                    smartContractAddress_1 = metadata.blockchain.smartContractAddress;
                    version = metadata['version'];
                    if (!!availableContracts.find(function (x) { return x.toLowerCase() === smartContractAddress_1.toLowerCase(); })) return [3 /*break*/, 3];
                    isValid = false;
                    return [3 /*break*/, 9];
                case 3:
                    if (version.includes('university')) {
                        return [2 /*return*/, _validateUniversity(PDFHash, metadata, isTestnet, nodeUrl)];
                    }
                    return [4 /*yield*/, (0, blockchainServices_1.requestCertificationByHash)(PDFHash, smartContractAddress_1, isTestnet, nodeUrl)];
                case 4:
                    certification = _b.sent();
                    if (!(certification.hash !== PDFHash)) return [3 /*break*/, 5];
                    isValid = false;
                    return [3 /*break*/, 9];
                case 5:
                    if (certification.isRevoked) {
                        result.state = 'REVOKED';
                    }
                    else {
                        expireDate = parseInt(certification.expireDate) * 1000 || 0;
                        now = new Date().getTime();
                        if (expireDate !== 0 && now > expireDate) {
                            result.state = 'EXPIRED';
                        }
                        else {
                            result.state = 'ISSUED';
                        }
                    }
                    result.cert = certification;
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    _a = result;
                    return [4 /*yield*/, (0, blockchainServices_1.requestIssuerByAddress)(certification.issuer, isTestnet, nodeUrl)];
                case 7:
                    _a.issuer = _b.sent();
                    if (!isTestnet && !result.issuer.isActive) {
                        isValid = false;
                    }
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _b.sent();
                    isValid = false;
                    console.error(e_1);
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    e_2 = _b.sent();
                    console.error(e_2);
                    throw new Error('Баталгаажуулах явцад алдаа гарлаа.');
                case 11:
                    if (!isValid) {
                        result.state = 'INVALID';
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
function _validateUniversity(PDFHash, metadata, isTestnet, nodeUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var univMeta, result, utf8, x, metaHash, certInfo, expireDate, now, _a, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    univMeta = (0, jsonUtils_1.jsonWrap)(metadata['univ_meta']);
                    result = __assign(__assign({}, defaultResult), { isTestnet: isTestnet, isUniversity: true, metadata: metadata });
                    utf8 = require('utf8');
                    x = utf8.encode(univMeta);
                    return [4 /*yield*/, (0, pdfUtils_1.extractHash)(x)];
                case 1:
                    metaHash = _b.sent();
                    return [4 /*yield*/, (0, blockchainServices_1.requestUniversityCertByHash)(PDFHash, metadata.blockchain.smartContractAddress, isTestnet, nodeUrl)];
                case 2:
                    certInfo = _b.sent();
                    if (certInfo.cert.metaHash.toLowerCase() !== metaHash.toLowerCase()) {
                        throw new Error('Блокчэйн сүлжээнд баталгаажаагүй байна.');
                    }
                    console.log('Hash matched');
                    console.log(certInfo);
                    // if (!certInfo.approveInfo.isApproved) {
                    //   throw new Error('Блокчэйн сүлжээнд баталгаажаагүй байна.');
                    // }
                    if (!certInfo.approveInfo.isApproved) {
                        result.state = 'APPROVE_PENDING';
                    }
                    else if (certInfo.revokeInfo.isRevoked) {
                        result.state = 'REVOKED';
                    }
                    else {
                        expireDate = parseInt(certInfo.cert.expireDate) * 1000 || 0;
                        now = new Date().getTime();
                        if (expireDate !== 0 && now > expireDate) {
                            result.state = 'EXPIRED';
                        }
                        else {
                            result.state = 'ISSUED';
                        }
                    }
                    result.cert = certInfo.cert;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    _a = result;
                    return [4 /*yield*/, (0, blockchainServices_1.requestIssuerByAddress)(certInfo.cert.issuer, isTestnet, nodeUrl)];
                case 4:
                    _a.issuer = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _b.sent();
                    console.error(e_3);
                    throw new Error('Баталгаажуулагчийн мэдээлэл авахад алдаа гарлаа.');
                case 6:
                    // үндсэн сүлжээнд зөвхөн баталгаажсан байгууллагын мэдээллийг хүчинтэй харуулна
                    if (!isTestnet && !result.issuer.isActive) {
                        result.state = 'INVALID';
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
