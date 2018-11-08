// eslint-disable-next-line import/no-extraneous-dependencies
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

const isItFriday = (today) => {
  if (today === 'Friday') {
    return 'TGIF';
  }
  return 'Nope';
};

Given('today is {string}', (givenDay) => {
  this.today = givenDay;
});

When('I ask whether it\'s Friday yet', () => {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', (expectedAnswer) => {
  assert.equal(this.actualAnswer, expectedAnswer);
});
