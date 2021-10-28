import {expect, test} from '@oclif/test'

describe('version:dev', () => {
  test
  .stdout()
  .command(['version:dev'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['version:dev', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
