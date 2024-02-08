import { CONSTANTS_MIC_PERMISSION } from "../../utils/constantsValues";

/**
 * Custom error class for denied microphone permission.
 * @extends Error
 */
export class DeniedMicPermission extends Error {
    /**
     * Create a new DeniedMicPermission error instance.
     *
     * @param {string} message - A custom error message.
     */
    constructor(message) {
        const defaultMessage = 'Microphone permission not granted';
        super(message || defaultMessage);
        /**
         * The name of the error (CONSTANTS_MIC_PERMISSION.DENIED_MIC_PERMISSION_ERROR_NAME).
         * @type {string}
         */
        this.name = CONSTANTS_MIC_PERMISSION.DENIED_MIC_PERMISSION_ERROR_NAME;
    }
}
