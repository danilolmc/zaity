/**
 * Module for searching elements in the DOM.
 * @module SearchDOM
 */
export function SearchDOM() {
    /**
     * Searches for the first matching element within a target element.
     * @param {string} query - The query selector to search for.
     * @param {Element} targetElement - The target element to search within.
     * @returns {Element|null} - The first matching element, or null if not found.
     */
    function searchFirst(query, targetElement) {
      return targetElement.querySelector(query);
    }
  
    /**
     * Searches for all matching elements within a target node.
     * @param {string} query - The query selector to search for.
     * @param {Element} targetNode - The target element to search within.
     * @returns {NodeListOf<Element>} - A list of matching elements.
     */
    function searchAll(query, targetNode) {
      return targetNode.querySelectorAll(query);
    }
  
    // Return an object with search methods
    return {
      searchFirst,
      searchAll
    };
  }
  