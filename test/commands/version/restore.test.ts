import { expect, test } from '@oclif/test';

describe('version:restore', () => {
  test
    .stdout()
    .command(['version:restore'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world');
    });

  test
    .stdout()
    .command(['version:restore', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff');
    });
});
