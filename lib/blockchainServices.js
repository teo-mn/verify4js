"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.requestUniversityCertByHash = exports.requestIssuerByAddress = exports.requestCertificationByHash = exports.DEFAULT_ISSUER_ADDRESS = exports.DEFAULT_ISSUER_ADDRESS_TESTNET = exports.DEFAULT_NODE_URL = exports.DEFAULT_NODE_URL_TESTNET = void 0;
// @ts-ignore
var promise_allsettled_1 = __importDefault(require("promise.allsettled"));
var web3_1 = __importDefault(require("web3"));
// @ts-ignore
var certify_1 = require("./abi/certify");
// @ts-ignore
var university_1 = require("./abi/university");
// @ts-ignore
var issuer_1 = require("./abi/issuer");
promise_allsettled_1["default"].shim();
exports.DEFAULT_NODE_URL_TESTNET = 'https://node-testnet.teo.mn';
exports.DEFAULT_NODE_URL = 'https://node.teo.mn';
exports.DEFAULT_ISSUER_ADDRESS_TESTNET = '0x9dca2a5a5412C32930d6CAf8DC1e6c7C2DCd3483';
exports.DEFAULT_ISSUER_ADDRESS = '0x824B721ceaf50e66281c905F0e79F3EE45D52613';
var requestCertificationByHash = function (hash, contractAddress, isTestnet, nodeUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var url, client, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = nodeUrl || (isTestnet ? exports.DEFAULT_NODE_URL_TESTNET : exports.DEFAULT_NODE_URL);
                client = new web3_1["default"](url);
                contract = new client.eth.Contract(certify_1.abi, client.utils.toChecksumAddress(contractAddress));
                return [4 /*yield*/, contract.methods.getCertification(hash).call()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.requestCertificationByHash = requestCertificationByHash;
var requestIssuerByAddress = function (addr, isTestnet, nodeUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var contractAddress, url, client, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contractAddress = isTestnet ? exports.DEFAULT_ISSUER_ADDRESS_TESTNET : exports.DEFAULT_ISSUER_ADDRESS;
                url = nodeUrl || (isTestnet ? exports.DEFAULT_NODE_URL_TESTNET : exports.DEFAULT_NODE_URL);
                client = new web3_1["default"](url);
                return [4 /*yield*/, new client.eth.Contract(issuer_1.abi, client.utils.toChecksumAddress(contractAddress))];
            case 1:
                contract = _a.sent();
                return [4 /*yield*/, contract.methods.getIssuer(client.utils.toChecksumAddress(addr)).call()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.requestIssuerByAddress = requestIssuerByAddress;
var requestUniversityCertByHash = function (hash, contractAddress, isTestnet, nodeUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var url, client, contract, cert, revokeInfo, approveInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = nodeUrl || (isTestnet ? exports.DEFAULT_NODE_URL_TESTNET : exports.DEFAULT_NODE_URL);
                client = new web3_1["default"](url);
                contract = new client.eth.Contract(university_1.abi, client.utils.toChecksumAddress(contractAddress));
                return [4 /*yield*/, contract.methods.getCertification(hash).call()];
            case 1:
                cert = _a.sent();
                return [4 /*yield*/, contract.methods.getRevokeInfo(hash).call()];
            case 2:
                revokeInfo = _a.sent();
                return [4 /*yield*/, contract.methods.getApproveInfo(hash).call()];
            case 3:
                approveInfo = _a.sent();
                return [2 /*return*/, {
                        cert: cert,
                        revokeInfo: revokeInfo,
                        approveInfo: approveInfo
                    }];
        }
    });
}); };
exports.requestUniversityCertByHash = requestUniversityCertByHash;
