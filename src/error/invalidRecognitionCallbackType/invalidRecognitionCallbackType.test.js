import { describe, expect, test } from "vitest";
import { CONSTANTS_RECOGNITION } from "../../utils/constantsValues";
import { InvalidRecognitionCallbackType } from './invalidRecognitionCallbackType';

describe('Invalid recognition callback type errors', () => {

    test('should get recognition callback type error with custom message', () => {

        const errorCustomMessage = "Invalid callback type provided"
        const error = new InvalidRecognitionCallbackType(errorCustomMessage);
        
        expect(error.message).toBe(errorCustomMessage);
        expect(error.name).toBe(CONSTANTS_RECOGNITION.RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_NAME);
    })
    
    test('should get denied access mic error with default message', () => {
        
        const error = new InvalidRecognitionCallbackType();

        expect(error.message).toBe('Invalid recognition callback type');
        expect(error.name).toBe(CONSTANTS_RECOGNITION.RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_NAME);
    });
})