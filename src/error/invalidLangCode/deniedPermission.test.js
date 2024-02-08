import { describe, expect, test } from "vitest";
import { CONSTANTS_MIC_PERMISSION, CONSTANTS_SYNTHESIS } from "../../utils/constantsValues";
import { InvalidLangCode } from './invalidLangCode';

describe('Invalid language code errors', () => {

    test('should get invalid language code error with custom message', () => {

        const errorCustomMessage = "Invalid language code provided"
        const error = new InvalidLangCode(errorCustomMessage);

        expect(error.message).toBe(errorCustomMessage);
        expect(error.name).toBe(CONSTANTS_SYNTHESIS.SYNTHESIS_INVALID_LANG_TYPE_ERROR_NAME);
    })

    test('should get denied access mic error with default message', () => {

        const error = new InvalidLangCode();

        expect(error.message).toBe('Invalid language');
        expect(error.name).toBe(CONSTANTS_SYNTHESIS.SYNTHESIS_INVALID_LANG_TYPE_ERROR_NAME);
    });
})