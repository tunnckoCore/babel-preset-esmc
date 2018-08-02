'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const proc = require('process');
const test = require('asia');
const createPreset = require('../src/index');

test('foo bar', (t) => {
  t.ok(createPreset());
  t.ok(createPreset().presets);
  t.ok(createPreset().plugins);
});

test('should return config for browsers, non-commonjs', (t) => {
  proc.env.ESMC_BROWSERS = 'true';
  const config = createPreset();
  const presetEnv = config.presets[0];
  const { targets, modules } = presetEnv[1];

  t.ok(presetEnv);
  t.ok(modules === false);
  t.ok(presetEnv[0] === '@babel/preset-env');
  t.ok(targets.browsers);
  t.ok(targets.browsers.includes('>= 1%, not dead'));

  delete proc.env.ESMC_BROWSERS;
  delete proc.env.ESMC_CJS;
});

test('should return config for browsers, commonjs', (t) => {
  proc.env.ESMC_BROWSERS = 'true';
  proc.env.ESMC_CJS = 'true';

  const config = createPreset();
  const presetEnv = config.presets[0];
  const { targets, modules } = presetEnv[1];

  t.ok(presetEnv);
  t.ok(modules === 'commonjs');
  t.ok(presetEnv[0] === '@babel/preset-env');
  t.ok(targets.browsers);
  t.ok(targets.browsers.includes('>= 1%, not dead'));

  delete proc.env.ESMC_BROWSERS;
  delete proc.env.ESMC_CJS;
});

test('should return config for nodejs', (t) => {
  const config = createPreset();
  const presetEnv = config.presets[0];
  const { targets } = presetEnv[1];

  t.deepEqual(targets, { node: '8.9' });
});

test('should nodejs be equal to ESMC_NODEJS_VERSION env', (t) => {
  proc.env.ESMC_NODE_VERSION = '6.8';
  const config = createPreset();

  t.deepEqual(config.presets[0][1].targets, { node: '6.8' });
  delete proc.env.ESMC_NODE_VERSION;
});

test('should browsers be ESMC_BROWSERSLIST env', (t) => {
  proc.env.ESMC_BROWSERS = 'true';
  proc.env.ESMC_BROWSERSLIST = 'last 2 versions';
  const config = createPreset();

  t.deepEqual(config.presets[0][1].targets, { browsers: 'last 2 versions' });
  delete proc.env.ESMC_BROWSERS;
  delete proc.env.ESMC_BROWSERSLIST;
});
