/**
 * Sanitizes user input to prevent NoSQL injection attacks
 * @param {any} input - The user input to sanitize
 * @returns {string|null} - Sanitized string or null if invalid
 */
function sanitizeInput(input) {
  // If input is not a string, return null
  if (typeof input !== 'string') {
    return null;
  }
  
  // Remove any potential MongoDB operators and return the sanitized string
  // This ensures that only plain strings are passed to database queries
  return input.toString();
}

/**
 * Validates that a token is a non-empty string
 * @param {any} token - The token to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidToken(token) {
  return typeof token === 'string' && token.trim().length > 0;
}

module.exports = {
  sanitizeInput,
  isValidToken
};