/* eslint-env mocha */
const { assert } = require('chai');

const missionController = require('../../api/controllers/mission-controller')();
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
