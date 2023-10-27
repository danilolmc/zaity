import { checkSpeechSynthesisSupport } from "../IsSpeechSyntesisSupported";
import { checkEnvironmentSupport } from "../isBrowserEnv";

/**
 * Check for SpeechSynthesis support and return the SpeechSynthesis object.
 *
 * @returns {SpeechSynthesis} The SpeechSynthesis object if supported, or null if not supported.
 * @throws {Error} If the browser environment or SpeechSynthesis support check fails.
 */
export function buildSpeechSynthesis() {
    checkEnvironmentSupport();
    checkSpeechSynthesisSupport();

    return window.speechSynthesis;
}
