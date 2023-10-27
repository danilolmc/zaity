import { CONSTANTS_RECOGNITION } from "../utils/constantsValues";

/**
 * Custom error class for invalid recognition callback type.
 * @extends Error
 */
export class InvalidRecognitionCallbackType extends Error {
    /**
     * Create a new InvalidRecognitionCallbackType error instance.
     *
     * @param {string} message - A custom error message.
     */
    constructor(message) {
        super(message);
        /**
         * The name of the error (CONSTANTS_RECOGNITION.RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_NAME).
         * @type {string}
         */
        this.name = CONSTANTS_RECOGNITION.RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_NAME;
    }
}
