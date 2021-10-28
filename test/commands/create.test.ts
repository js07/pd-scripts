import { expect, test } from '@oclif/test';

describe('create', () => {
  test
    .stderr()
    .command(['create'])
    .catch(error => {
      expect(error.message).to.contain('Missing 1 required arg:');
    })
    .it('requires FILES argument');
});
