export declare const DEFAULT_NODE_URL_TESTNET = "https://node-testnet.teo.mn";
export declare const DEFAULT_NODE_URL = "https://node.teo.mn";
export declare const DEFAULT_ISSUER_ADDRESS_TESTNET = "0x9dca2a5a5412C32930d6CAf8DC1e6c7C2DCd3483";
export declare const DEFAULT_ISSUER_ADDRESS = "0x824B721ceaf50e66281c905F0e79F3EE45D52613";
export declare const requestCertificationByHash: (hash: string, contractAddress: string, isTestnet: boolean, nodeUrl: string) => Promise<any>;
export declare const requestIssuerByAddress: (addr: string, isTestnet: boolean, nodeUrl: string) => Promise<any>;
export declare const requestUniversityCertByHash: (hash: string, contractAddress: string, isTestnet: boolean, nodeUrl: string) => Promise<{
    cert: any;
    revokeInfo: any;
    approveInfo: any;
}>;
