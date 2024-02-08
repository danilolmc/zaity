import { CONSTANTS_VOICE_COMMAND } from "../../utils/constantsValues";

/**
 * Custom error class for invalid voice command callback type.
 * @extends Error
 */
export class InvalidVoiceCommandCallbackType extends Error {
    /**
     * Create a new InvalidVoiceCommandCallbackType error instance.
     *
     * @param {string} message - A custom error message.
     */
    constructor(message) {
        const defaultMessage = 'Invalid command callback type';
        super(message || defaultMessage);
        /**
         * The name of the error (CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_NAME).
         * @type {string}
         */
        this.name = CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_NAME;
    }
}
