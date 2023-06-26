class InvalidPdfException extends Error {
    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidPdfException.prototype);
    }
}
