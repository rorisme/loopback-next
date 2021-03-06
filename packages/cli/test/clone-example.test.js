// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/cli
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

('use strict');

const promisify = require('util').promisify;

const cloneExampleFromGitHub = require('../generators/example/clone-example');
const expect = require('@loopback/testlab').expect;
const TestSandbox = require('@loopback/testlab').TestSandbox;
const glob = promisify(require('glob'));
const path = require('path');

const VALID_EXAMPLE = 'getting-started';
const SANDBOX_PATH = path.resolve(__dirname, 'sandbox');
let sandbox;

describe.skip('cloneExampleFromGitHub (SLOW)', function() {
  this.timeout(20000);
  before(createSandbox);
  beforeEach(resetSandbox);

  /**
   * FIXME(kjdelisle): This test will prevent any meaningful changes from
   * landing in example repositories, since it will always fail the equality
   * test provided when new files are added, or when existing files are
   * removed as a part of refactor/cleanup.
   *
   * While I do value the idea of verifying that the example packages are
   * being cloned properly, we can't hang that idea on validating the
   * particular presence of any content that isn't perpetually required.
   *
   * This test can be removed once strongloop/loopback-next#932 is complete.
   */
  it('extracts all project files', () => {
    return cloneExampleFromGitHub(VALID_EXAMPLE, SANDBOX_PATH)
      .then(outDir => {
        return Promise.all([
          glob('**', {
            cwd: path.join(__dirname, `../../example-${VALID_EXAMPLE}`),
            ignore: '@(node_modules|dist*|api-docs)/**',
          }),
          glob('**', {
            cwd: outDir,
            ignore: 'node_modules/**',
          }),
        ]);
      })
      .then(found => {
        const [expected, actual] = found;
        expect(actual).to.deepEqual(expected);
      });
  });

  function createSandbox() {
    sandbox = new TestSandbox(SANDBOX_PATH);
  }

  function resetSandbox() {
    sandbox.reset();
  }
});
