import { describe, expect, test } from "vitest";
import { CONSTANTS_MIC_PERMISSION } from "../../utils/constantsValues";
import { DeniedMicPermission } from './deniedPermission';

describe('Denied Mic access permission errors', () => {

    test('should get denied access mic error with custom message', () => {

        const errorCustomMessage = "Permission to microfone not granted"
        const error = new DeniedMicPermission(errorCustomMessage);

        expect(error.message).toBe(errorCustomMessage);
        expect(error.name).toBe(CONSTANTS_MIC_PERMISSION.DENIED_MIC_PERMISSION_ERROR_NAME);
    })

    test('should get denied access mic error with default message', () => {

        const error = new DeniedMicPermission();

        expect(error.message).toBe('Microphone permission not granted');
        expect(error.name).toBe(CONSTANTS_MIC_PERMISSION.DENIED_MIC_PERMISSION_ERROR_NAME);
    });
})