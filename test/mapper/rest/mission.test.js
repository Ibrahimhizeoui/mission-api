const { expect } = require('chai');

const MissionRestApiMapper = require('../../../api/mapper/rest/mission');

describe('PaymentRestApiMapper', () => {
  describe('#map()', () => {
    it('rejects missing input', async () => {
      expect(() => MissionRestApiMapper.map()).to.throw();
    });
  });
});
