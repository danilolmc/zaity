/**
 * Creates a debounce function that delays the execution of the given function.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} delay - The delay time in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * Module for capturing voice and generating captions using the Speech Recognition API.
 *
 * @module VoiceCaptions
 * @param {Object} params - Configuration parameters for VoiceCaptions.
 * @param {boolean} [params.continuous=true] - Specifies if the recognition should be continuous.
 * @param {boolean} [params.interimResults=false] - Specifies if interim results should be provided.
 * @param {string} [params.lang='pt-BR'] - Specifies the language for recognition.
 * @param {number} [params.DEBOUNCE_DELAY=50] - Specifies the debounce delay for updates.
 * @param {boolean} [params.keepListening=true] - Specifies if recognition should keep listening after each end event.
 * @param {Function} [params.onEnd] - Callback function to be called when recognition ends.
 * @param {Function} [params.onStart] - Callback function to be called when recognition starts.
 * @param {Array<Function>} [params.middlewares] - Array of middleware functions to apply to the transcript.
 * @returns {Object} - VoiceCaptions module.
 */
export function VoiceCaptions(params) {
  const recognition = new SpeechRecognition();

  const {
    continuous = true,
    interimResults = false,
    lang = 'pt-BR',
    DEBOUNCE_DELAY = 50,
    keepListening = true,
    onEnd = () => {},
    onStart = () => {},
    middlewares = []
  } = params;

  recognition.continuous = continuous;
  recognition.interimResults = interimResults;
  recognition.lang = lang;

  /**
   * Initiates voice recognition and captures speech input.
   *
   * @param {Function|HTMLElement} callbackOperation - Callback function or HTMLElement.
   * @throws {Error} - Throws an error if the browser does not support the Speech Recognition API.
   * @returns {void}
   */
  function listen(callbackOperation) {
    if (typeof window === 'undefined') {
      throw new Error('This module is only supported on browsers.');
    }

    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      throw new Error('Speech Recognition API not supported in this browser.');
    }

    function applyMiddlewares(transcript, middlewaresList) {
      if (middlewaresList.length > 0) {
        const pipe = (...functions) => initialValue => {
          return functions.reduce((result, middleware) => {
            if (middleware instanceof Function) {
              return middleware(result);
            } else {
              throw new Error(`Invalid middleware at index ${index}, it must be a function`);
            }
          }, initialValue);
        };

        return pipe(...middlewaresList)(transcript);
      } else {
        return transcript;
      }
    }

    recognition.onresult = event => {
      const result = applyMiddlewares(event.results[event.results.length - 1][0].transcript, middlewares);

      if (callbackOperation instanceof Function) {
        debounce(() => callbackOperation(result), DEBOUNCE_DELAY);
      }

      if (callbackOperation instanceof HTMLElement) {
        const element = callbackOperation;
        debounce(() => element.textContent = result, DEBOUNCE_DELAY);
      }
    };

    recognition.onstart = () => {
      onStart();
    };

    recognition.onend = () => {
      if (keepListening) recognition.start();
      onEnd();
    };

    recognition.start();
  }

  /**
   * Stops listening for speech.
   *
   * @returns {void}
   */
  function stopListening() {
    keepListening = false;
    recognition.stop();
  }

  // Return an object with methods
  return {
    /**
     * Starts listening for speech and captures voice input.
     *
     * @param {Function|HTMLElement} callbackOperation - Callback function or HTMLElement.
     * @throws {Error} - Throws an error if the browser or Speech Recognition API is not supported.
     * @returns {void}
     */
    listen,
    stopListening
  };
}
