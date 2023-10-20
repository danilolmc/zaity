/**
 * Checks if the current environment is a browser.
 *
 * @throws {Error} If the code is not running in a browser environment.
 */
export function checkEnvironmentSupport() {
    if (typeof window === 'undefined') {
      throw new Error('This module is only supported on browsers.');
    }
  }
  