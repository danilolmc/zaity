/**
 * Checks if the Speech Syntesis interface is supported in the current browser.
 *
 * @throws {Error} If the Speech Syntesis interface is not supported in this browser.
 */
export function checkSpeechSynthesisSupport() {
    if (!('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window)) {
      throw new Error('Speech Synthesis interface is not supported in this browser.');
    }
  }
  