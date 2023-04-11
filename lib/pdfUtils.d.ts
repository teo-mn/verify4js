declare const ArrayBufferToString: (arrayBuffer: ArrayBuffer) => string;
declare const StringToArrayBuffer: (str: string) => ArrayBuffer;
declare const extractHash: (pdfString: string) => Promise<string>;
export { ArrayBufferToString, StringToArrayBuffer, extractHash };
