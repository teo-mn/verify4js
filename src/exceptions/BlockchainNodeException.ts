export class BlockchainNodeException {
    constructor(message: string) {
        const error = Error(message);

        // set immutable object properties
        Object.defineProperty(error, 'message', {
            get() {
                return message;
            }
        });
        Object.defineProperty(error, 'name', {
            get() {
                return 'BlockchainNodeException';
            }
        });
        // capture where error occured
        Error.captureStackTrace(error, BlockchainNodeException);
        return error;
    }
}
