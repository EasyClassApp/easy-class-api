import path from 'path';
import merge from 'webpack-merge';
import * as parts from './webpack.parts.babel';

const commonConfig = merge([
  {
    entry: {
      bundle: path.resolve(__dirname, '../src/index.jsx'),
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
  },
  parts.jsLinterLoader(),
  parts.jsTranspilerLoader(),
  parts.stylesLoader(),
  parts.useHtmlTemplatePlugin(),
  parts.codeSplittingPlugin(),
]);

export default commonConfig;
