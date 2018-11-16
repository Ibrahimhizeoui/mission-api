const jsonschema = require('jsonschema');

const {
  InvalidJSONSchema, InvalidInputJSONSchema, InvalidReturnJSONSchema, InvalidFilterJSONSchema,
} = require('../common/errors');

const classes = {
  InvalidJSONSchema, InvalidReturnJSONSchema, InvalidInputJSONSchema, InvalidFilterJSONSchema,
};

/**
 * Abstract class for json objects that validates given JSON data and assigns each
 * member to itself.
 */
class AbstractJsonObject {
  /**
   * Validates given JSON data and creates a new instance with the elements
   * applied to it.
   *
   * @param {object} data - Unvalidated JSON data.
   * @param {object} schema - JSON-schema to use.
   * @param {string} errorType - Error class name to throw when validation is failing.
   */
  constructor(data, schema, errorType) {
    const result = jsonschema.validate(data, schema);

    if (!result.valid) {
      throw new classes[errorType](schema.title, result.errors);
    }

    Object.keys(data).forEach((key) => { this[key] = data[key]; });
  }
}

exports.AbstractJsonObject = AbstractJsonObject;
