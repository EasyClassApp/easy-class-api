/* ***************************************************************************
  Use the following sufixes to indicate the purpose of each 'part':
    * Loader
    * Config
    * Plugin
**************************************************************************** */
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function jsLinterLoader() {
  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
        },
      }],
    },
  };
}

export function jsTranspilerLoader() {
  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        }],
      }],
    },
  };
}

export function stylesLoader() {
  return {
    module: {
      rules: [{
        test: /\.(css|sass)$/, // use either sass or scss (-- error when using 'css|scss|sass')
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 2,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./styles/bulma.sass'], // global imports (so you don't need to import in every specific sass file)
            },
          },
          ],
        }),
      }],
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
    ],

  };
}

export function imagesLoader({ include, exclude, options } = {}) {
  return {
    module: {
      rules: [{
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      }],
    },
  };
}

export function devServerConfig({ host, port, proxy } = {}) {
  return {
    devServer: {
      host,
      port,
      proxy,
      stats: {
        assets: false,
        modules: false,
        hash: false,
        timings: false,
        version: false,
      },
      overlay: {
        errors: true,
        warnings: true,
      },
      historyApiFallback: true,
    },
  };
}

export function sourceMapConfig() {
  return {
    devtool: '#source-map',
  };
}

export function minificationPlugin() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        warnings: false,
        mangle: true,
      }),
    ],
  };
}

export function useHtmlTemplatePlugin() {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './assets/favicon.ico',
      }),
    ],
  };
}

export function codeSplittingPlugin() {
  return {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
      }),
    ],
  };
}

export function setFreeVariablePlugin(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
}
