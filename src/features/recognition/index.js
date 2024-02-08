import { DeniedMicPermission } from "../../error/deniedPermission/deniedPermission";
import { InvalidRecognitionCallbackType } from "../../error/invalidRecognitionCallbackType/invalidRecognitionCallbackType";
import { applyMiddlewares } from "../../utils/applyMiddlewares";
import { buildSpeechRecognition } from "../../utils/builders/speechRecognitionBuilder";
import { CONSTANTS_MIC_PERMISSION, CONSTANTS_RECOGNITION } from "../../utils/constantsValues";
import { debounce } from "../../utils/debounce";

/**
 * Module for capturing voice and generating captions using the Speech Recognition API.
 *
 * @module VoiceRecognition
 * @param {Object} params - Configuration parameters for VoiceRecognition.
 * @param {boolean} [params.continuous=true] - Specifies if the recognition should be continuous.
 * @param {boolean} [params.interimResults=false] - Specifies if interim results should be provided.
 * @param {string} [params.lang='pt-BR'] - Specifies the language for recognition.
 * @param {number} [params.DEBOUNCE_DELAY=50] - Specifies the debounce delay for updates.
 * @param {boolean} [params.keepListening=true] - Specifies if recognition should keep listening after each end event.
 * @param {Function} [params.onEnd] - Callback function to be called when recognition ends.
 * @param {Function} [params.onStart] - Callback function to be called when recognition starts.
 * @param {Function} [params.onError] - Callback function to be called when recognition throw an error.
 * @param {Array<Function>} [params.middlewares] - Array of middleware functions to apply to the transcript.
 * @throws {Error} - Throws an error if the browser or Speech Recognition API is not supported.
 * @throws {InvalidRecognitionCallbackType} Throws an error if the callback operation type is invalid.
 * @returns {{
 *   listen: (callbackOperation: Function|HTMLElement) => void,
 *   stopListening: () => void
 * }}
 */
export function VoiceRecognition(params) {
  let recognitionInstance;

  let {
    continuous = true,
    interimResults = false,
    lang = 'pt-BR',
    DEBOUNCE_DELAY = 50,
    keepListening = true,
    onEnd = () => { },
    onStart = () => { },
    onError = _ => { },
    middlewares = []
  } = params;

  /**
   * Creates a new instance of SpeechRecognition with the specified configuration.
   */
  function createInstance() {
    recognitionInstance = buildSpeechRecognition();
    recognitionInstance.continuous = continuous;
    recognitionInstance.interimResults = interimResults;
    recognitionInstance.lang = lang;
  }

  /**
   * Checks the callback operation type.
   *
   * @param {Function|HTMLElement} callbackOperation - The callback operation to be checked.
   * @throws {InvalidRecognitionCallbackType} Throws an error if the callback operation type is invalid.
   */
  function checkCallbackOperationType(callbackOperation) {
    if (!(callbackOperation instanceof Function) && !(callbackOperation instanceof HTMLElement)) {
      throw new InvalidRecognitionCallbackType(CONSTANTS_RECOGNITION.RECOGNITION_INVALID_CALLBACK_TYPE_ERROR_MESSAGE('Function or HTMLElement'));
    }
  }

  /**
   * Initiates voice recognition and captures speech input.
   *
   * @param {Function|HTMLElement} callbackOperation - Callback function or HTMLElement.
   * @throws {Error} - Throws an error if the browser does not support the Speech Recognition API.
   * @returns {void}
   */
  function listen(callbackOperation) {
    createInstance();

    recognitionInstance.onresult = event => {
      const result = applyMiddlewares(event.results[event.results.length - 1][0].transcript, middlewares);

      checkCallbackOperationType(callbackOperation);

      if (callbackOperation instanceof Function) {
        const debouncedFunction = debounce(callbackOperation, DEBOUNCE_DELAY);
        debouncedFunction(result);
        return;
      }

      if (callbackOperation instanceof HTMLElement) {
        const element = callbackOperation;
        const debouncedFunction = debounce(() => element.textContent = result, DEBOUNCE_DELAY);
        debouncedFunction();
        return;
      }
    };

    recognitionInstance.onstart = () => {
      onStart();
    };

    recognitionInstance.onerror = event => {
      if (event.error === CONSTANTS_MIC_PERMISSION.DENIED_PERMISSION_ERROR) {
        onError(new DeniedMicPermission(CONSTANTS_MIC_PERMISSION.DENIED_PERMISSION_MESSAGE));
        return;
      }
      onError(event.error)
    };

    recognitionInstance.onend = () => {
      if (keepListening) recognitionInstance.start();
      onEnd();
    };

    recognitionInstance.start();
  }

  /**
   * Stops listening for speech.
   *
   * @returns {void}
   */
  function stopListening() {
    keepListening = false;
    recognitionInstance.stop();
  }

  return {
    listen,
    stopListening
  };
}
