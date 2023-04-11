import { VerifyResultInterface } from './interfaces';
export declare const verify: (pdfArrayBuffer: ArrayBuffer, nodeUrl?: string) => Promise<VerifyResultInterface>;
export declare const extractMetadata: (pdfInfo: {
    Custom: {
        verifymn: string;
    };
}) => Promise<any>;
