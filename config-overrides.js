const { override, fixBabelImports, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackModuleRule({
    test: /\.styl$/, 
    use: ['style-loader', 'css-loader', 'stylus-loader']
  })
);