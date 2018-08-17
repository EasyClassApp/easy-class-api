import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel';
import * as parts from './webpack.parts.babel';

const developmentConfig = merge([
  commonConfig,
  parts.imagesLoader(),
  parts.sourceMapConfig(),
  parts.setFreeVariablePlugin('SERVER_URL', 'http://localhost:8081'),
  parts.devServerConfig({
    host: process.env.HOST,
    port: 3000,
  }),
]);

export default developmentConfig;
