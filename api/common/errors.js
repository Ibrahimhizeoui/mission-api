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

/**
 * Error for when a jsonschema was found to be invalid, contains the details of
 * the validation.
 */
class InvalidJSONSchema extends BaseError {
  /**
     * Creates a new error along with the jsonschema field errors.
     *
     * @param {string} title - Title of type.
     * @param {Array<object>} fieldErrors - list of jsonschema errors.
     */
  constructor(title, fieldErrors, ...rest) {
    super(
      400,
      'json-schema-validation',
      InvalidJSONSchema.simplifyFieldErrors(fieldErrors),
      `Validating input by jsonschema ${title} failed`,
      ...rest,
    );

    this.title = title;
  }

  /**
     * Helper that simplifies field errors from a jsonschema validation result.
     * Only keeps the most relevant information.
     *
     * @param {Array<object>} fieldErrors - Field errors to simplify.
     * @returns {Array<object>} - Simplified errors.
     */
  static simplifyFieldErrors(fieldErrors) {
    return _.map(fieldErrors, err => ({
      property: err.property.replace('instance.', ''),
      message: err.message,
    }));
  }
}

/**
   * Error for when a jsonschema to return was found to be invalid, contains the details of
   * the validation.
   */
class InvalidReturnJSONSchema extends BaseError {
  /**
     * Creates a new error along with the jsonschema field errors.
     *
     * @param {string} title - Title of type.
     * @param {Array<object>} fieldErrors - list of jsonschema errors.
     */
  constructor(title, fieldErrors, ...rest) {
    super(
      500,
      'json-schema-validation',
      InvalidJSONSchema.simplifyFieldErrors(fieldErrors),
      `Validating output by jsonschema ${title} failed`,
      ...rest,
    );
  }
}

/**
   * Error for when a jsonschema passed to input filter was found to be invalid,
   * contains the details of the validation.
   */
class InvalidFilterJSONSchema extends BaseError {
  /**
     * Creates a new error along with the jsonschema field errors.
     *
     * @param {string} title - Title of type.
     * @param {Array<object>} fieldErrors - list of jsonschema errors.
     */
  constructor(title, fieldErrors, ...rest) {
    super(
      400,
      'json-schema-validation',
      InvalidJSONSchema.simplifyFieldErrors(fieldErrors),
      `Validating URL parametrs by ${title} failed`,
      ...rest,
    );
  }
}

/**
   * Error for when a jsonschema sended via HTTP POST and PATCH was found to be invalid,
   * contains the details of the validation.
   */
class InvalidInputJSONSchema extends BaseError {
  /**
     * Creates a new error along with the jsonschema field errors.
     *
     * @param {string} title - Title of type.
     * @param {Array<object>} fieldErrors - list of jsonschema errors.
     */
  constructor(title, fieldErrors, ...rest) {
    super(
      400,
      'json-schema-validation',
      InvalidJSONSchema.simplifyFieldErrors(fieldErrors),
      `Validating input by jsonschema ${title} failed`,
      ...rest,
    );
  }
}


module.exports = {
  BaseError,
  ObjectNotFound,
  InvalidJSONSchema,
  InvalidInputJSONSchema,
  InvalidReturnJSONSchema,
  InvalidFilterJSONSchema,
};
