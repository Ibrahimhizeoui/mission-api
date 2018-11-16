const { AbstractJsonObject } = require('../abstract-json-object');

/**
 * Abstract class for Rest APi
 */
class AbstractRestApi extends AbstractJsonObject {
  /**
   * Validates given JSON data and creates a new instance with the elements
   * applied to it.
   *
   * @param {object} data - Unvalidated JSON data.
   * @param {object} schema - JSON-schema to use.
   */
  constructor(data, schema) {
    super(data, schema, 'InvalidReturnJSONSchema');
  }
}

exports.AbstractRestApi = AbstractRestApi;
