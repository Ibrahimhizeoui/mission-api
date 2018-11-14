/**
 * Contains all application wide errors.
 *
 * @module commonErrors
 */

const _ = require('lodash');

/**
 * Abstract class that contains a default implementation of converting the error
 * to a HTTP response.
 */
class BaseError extends Error {
  /**
     * Creates a base error that should be able to be converted to a HTTP response.
     *
     * @param {number} statusCode - HTTP status code to use when creating response.
     * @param {string} identifier - Unique identifier for this particular Error type.
     * @param {Array<object>} details - Details about the error, AKA "sub errors".
     */
  constructor(statusCode, identifier, details, ...rest) {
    super(...rest);

    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.identifier = identifier || 'internal-error';
    this.details = details;
    this.message = this.message || 'Unknown internal error occured';
  }
}

/**
 * Error for when some object of a resource was not found, can be either a direct
 * access or relational access.
 */
class ObjectNotFound extends BaseError {
  /**
     * Creates a new error along with name of the resource name and the unique
     * identifier of the object.
     *
     * @param {string} resourceName - Name of the object type.
     * @param {string} objectIdentifier - Unique identifier.
     */
  constructor(resourceName, objectIdentifier, ...rest) {
    const details = [
      {
        property: resourceName,
        message: `Was not found using identifier ${objectIdentifier}`,
      },
    ];

    const message = `${resourceName} was not found using identifier: ${objectIdentifier}`;

    super(404, 'object-not-found', details, message, ...rest);
  }
}

module.exports = {
  BaseError,
  ObjectNotFound,
};
