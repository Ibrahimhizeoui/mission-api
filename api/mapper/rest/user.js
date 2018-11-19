const _ = require('lodash');
const { AbstractRestApi } = require('./abstract-rest-api');

const schema = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  title: 'UserRestAPI',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    uuid: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    additionalProperties: false,
  },
};

/**
 * Rest Api representation for User.
 */
class UserRestApi extends AbstractRestApi {
  /**
     * Initializes the RestApi.
     *
     * @param {object} User - UserRestAPi payload
     */
  constructor(User) {
    super(User, schema);
  }
}

/**
   * Mapper from User methods DTO to Rest API
   */
class UserRestApiMapper {
  /**
     * Maps the UserDTO to RestApi.
     *
     * @param {User} User - UserDTO object
     * @returns {UserRestApi} - Api reporesentation for User
     */
  static map(User) { /* eslint-disable no-param-reassign */
    const UserPayload = _.cloneDeep(_.omit(User, [
      'id',
      'version',
    ]));
      // UserPayload.createdAt = UserPayload.createdAt.toISOString();
      // UserPayload.updatedAt = UserPayload.updatedAt.toISOString();
    return new UserRestApi(UserPayload);
  }
}

exports.UserRestApiMapper = UserRestApiMapper;
exports.UserRestApi = UserRestApi;
