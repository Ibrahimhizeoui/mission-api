const _ = require('lodash');
const { AbstractRestApi } = require('./abstract-rest-api');

const schema = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  title: 'MissionRestAPI',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    status: {
      type: 'string',
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    },
    additionalProperties: false,
  },
};

/**
 * Rest Api representation for Mission.
 */
class MissionRestApi extends AbstractRestApi {
  /**
     * Initializes the RestApi.
     *
     * @param {object} mission - MissionRestAPi payload
     */
  constructor(mission) {
    super(mission, schema);
  }
}

/**
   * Mapper from Mission methods DTO to Rest API
   */
class MissionRestApiMapper {
  /**
     * Maps the MissionDTO to RestApi.
     *
     * @param {Mission} Mission - MissionDTO object
     * @returns {MissionRestApi} - Api reporesentation for Mission
     */
  static map(Mission) { /* eslint-disable no-param-reassign */
    const MissionPayload = _.cloneDeep(_.omit(Mission, [
      'id',
      'version',
    ]));
      // MissionPayload.createdAt = MissionPayload.createdAt.toISOString();
      // MissionPayload.updatedAt = MissionPayload.updatedAt.toISOString();
    return new MissionRestApi(MissionPayload);
  }
}

exports.MissionRestApiMapper = MissionRestApiMapper;
exports.MissionRestApi = MissionRestApi;
