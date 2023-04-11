"use strict";
exports.__esModule = true;
exports.BlockchainNodeException = void 0;
var BlockchainNodeException = /** @class */ (function () {
    function BlockchainNodeException(message) {
        var error = Error(message);
        // set immutable object properties
        Object.defineProperty(error, 'message', {
            get: function () {
                return message;
            }
        });
        Object.defineProperty(error, 'name', {
            get: function () {
                return 'BlockchainNodeException';
            }
        });
        // capture where error occured
        Error.captureStackTrace(error, BlockchainNodeException);
        return error;
    }
    return BlockchainNodeException;
}());
exports.BlockchainNodeException = BlockchainNodeException;
