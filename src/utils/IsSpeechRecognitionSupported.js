/**
 * Checks if the Speech Recognition API is supported in the current browser.
 *
 * @throws {Error} If the Speech Recognition API is not supported in this browser.
 */
export function checkSpeechRecognitionSupport() {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      throw new Error('Speech Recognition API not supported in this browser.');
    }
  }
  