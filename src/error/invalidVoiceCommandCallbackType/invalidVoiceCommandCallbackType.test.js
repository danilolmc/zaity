import { describe, expect, test } from "vitest";
import { InvalidVoiceCommandCallbackType } from './invalidVoiceCommandCallbackType'
import { CONSTANTS_VOICE_COMMAND } from "../../utils/constantsValues";

describe('Invalid command callback type errors', () => {

    test('should get an invalid command callback with custom message', () => {

        const errorCustomMessage = "Invalid command callback type provided"
        const error = new InvalidVoiceCommandCallbackType(errorCustomMessage);

        expect(error.message).toBe(errorCustomMessage);
        expect(error.name).toBe(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_NAME);
    })

    test('should get an invalid command callback with default message', () => {

        const error = new InvalidVoiceCommandCallbackType();

        expect(error.message).toBe('Invalid command callback type');
        expect(error.name).toBe(CONSTANTS_VOICE_COMMAND.COMMAND_VOICE_INVALID_CALLBACK_TYPE_ERROR_NAME);
    });
})