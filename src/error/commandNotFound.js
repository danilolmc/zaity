import { CONSTANTS_VOICE_COMMAND } from "../utils/constantsValues";

/**
 * Custom error class for voice command not found.
 * @extends Error
 */
export class VoiceCommandNotFound extends Error {
    /**
     * Create a new VoiceCommandNotFound error instance.
     *
     * @param {string} message - A custom error message.
     */
    constructor(message) {
        super(message);
        /**
         * The name of the error (CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_NOT_FOUND_ERROR_NAME).
         * @type {string}
         */
        this.name = CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_NOT_FOUND_ERROR_NAME;
    }
}
