const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const webpack = require("webpack");
const svgToMiniDataURI = require('mini-svg-data-uri');

function baseName(env) {
  if (env && env.baseName) {
    return env.baseName;
  }
  return "";
}

/**
 * Determine base path where the application is hosted. Essentially for hosting
 * the application in a subdirectory, such as www.server.com/composer.
 *
 * @param {*} env - Environment configuration.
 * @return {string} - Basename used to host the application. 
 */
function assetPath(env) {
  if (env && env.assetPath) {
    return env.assetPath;
  }
  return baseName(env);
}

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "visdom-poc",
    projectName: "composer",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    plugins: [
      new webpack.DefinePlugin({
        __BASENAME__: JSON.stringify(baseName(webpackConfigEnv)),
        __ASSETPATH__: JSON.stringify(assetPath(webpackConfigEnv)),
      }),
    ],
    module: {
      rules: [
        { test: /\\.css$/, use: ["style-loader", "css-loader"] },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                generator: (content) => svgToMiniDataURI(content.toString()),
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff2?)$/,
          use: "url-loader?name=[name].[ext]",
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      },
      https: true,
    },
  });
};
