 /**
 * Applies a list of middleware functions to the input text.
 *
 * @param {string} text - The input text to be processed by the middlewares.
 * @param {Function[]} middlewaresList - An array of middleware functions to be applied in order.
 *
 * @throws {Error} If any of the middlewares is not a function.
 *
 * @returns {string} The processed text after applying all the middlewares.
 */
export function applyMiddlewares(text, middlewaresList) {
    /**
     * A higher-order function that applies a list of functions in sequence to an initial value.
     *
     * @param {...Function} functions - The middleware functions to be applied.
     * @returns {Function} A function that takes an initial value and returns the result after applying all the functions.
     */
    const pipe = (...functions) => initialValue => {
      return functions.reduce((result, middleware, index) => {
        if (middleware instanceof Function) {
          return middleware(result);
        } else {
          throw new Error(`Invalid middleware at index ${index}, it should be a function`);
        }
      }, initialValue);
    };
  
    if (middlewaresList.length > 0) {
      return pipe(...middlewaresList)(text);
    } else {
      return text;
    }
  }
  