'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const proc = require('process');

module.exports = () => {
  const browsers = proc.env.ESMC_BROWSERS === 'true';
  const cjs = proc.env.ESMC_CJS === 'true';
  const nodejsVersion = proc.env.ESMC_NODE_VERSION || '8.9';
  const fo = proc.env.ESMC_BROWSERSLIST;

  const targets = browsers
    ? { browsers: fo || '>= 1%, not dead, not IE <= 11, last 1 Opera versions' }
    : { node: nodejsVersion };

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets,
          modules: cjs ? 'commonjs' : false,
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ].filter(Boolean),
    plugins: [
      browsers && [
        'module:fast-async',
        {
          spec: true,
        },
      ],

      // Stage 0
      '@babel/plugin-proposal-function-bind',

      // Stage 1
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
      '@babel/plugin-proposal-do-expressions',

      // Stage 2
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',

      // Stage 3
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
    ].filter(Boolean),
  };
};
