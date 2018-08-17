import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel';
import * as parts from './webpack.parts.babel';

const productionConfig = merge([
  commonConfig,
  parts.imagesLoader({
    options: {
      limit: 8192,
      name: './assets/[name].[ext]',
    },
  }),
  parts.minificationPlugin(),
  parts.setFreeVariablePlugin('process.env.NODE_ENV', 'production'),
  parts.setFreeVariablePlugin('SERVER_URL', ''), // when in production, both client and server are in the same server
]);

export default productionConfig;
