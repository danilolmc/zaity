// @ts-nocheck
import { checkSpeechRecognitionSupport } from "../IsSpeechRecognitionSupported";
import { checkEnvironmentSupport } from "../isBrowserEnv";

/**
 * Build a SpeechRecognition object based on the user's browser.
 *
 * @returns {SpeechRecognition} A SpeechRecognition object based on the browser support.
 */
export function buildSpeechRecognition() {
    checkEnvironmentSupport();
    checkSpeechRecognitionSupport();

    return new window.webkitSpeechRecognition();
}
