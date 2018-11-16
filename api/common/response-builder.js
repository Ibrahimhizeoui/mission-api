
const _ = require('lodash');
const jsonSchema = require('jsonschema');

const { InternalServerError } = require('./errors');

//---------------------------------------------------------------------------------

const ok = body => ({ statusCode: 200, body });

module.exports = {
  ok,
  created: body => ({ statusCode: 201, body }),
  updated: body => ({ statusCode: 200, body }),
  deleted: body => ({ statusCode: 200, body }),
  generateResponse: (document, schema) => {
    if (!_.isPlainObject(document) && !_.isArray(document)) {
      throw new InternalServerError('Document to output was not a plain object or array.');
    }

    const result = jsonSchema.validate(document, schema);

    if (!result.valid) {
      throw InternalServerError.schemaValidationFailed('Failed to validate output against schema', result.errors);
    }

    return ok(document);
  }
};
