import { CONSTANTS_SYNTHESIS } from "../utils/constantsValues";
/**
 * Custom error class for invalid language codes in speech synthesis.
 * @extends Error
 */
export class InvalidLangCode extends Error {
    /**
     * Create a new InvalidLangCode error instance.
     *
     * @param {string} message - A custom error message.
     */
    constructor(message) {
        super(message);
        /**
         * The name of the error (CONSTANTS_SYNTHESIS.SYNTHESIS_INVALID_LANG_TYPE_ERROR_NAME).
         * @type {string}
         */
        this.name = CONSTANTS_SYNTHESIS.SYNTHESIS_INVALID_LANG_TYPE_ERROR_NAME;
    }
}
