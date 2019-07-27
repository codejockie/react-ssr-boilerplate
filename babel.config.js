module.exports = api => {
  api.cache(true);

  return {
    env: {
      test: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        only: ['./**/*.js', 'node_modules/jest-runtime']
      }
    },
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions', 'safari 7'],
            node: 'current'
          },
          debug: false
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-transform-spread',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-export-default-from',
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  };
};
