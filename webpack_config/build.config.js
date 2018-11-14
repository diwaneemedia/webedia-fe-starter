const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin').default,
      path = require('path'),
      paths = require('./paths.js');

module.exports = {
    entry: paths.entry,
    output: {
        path: paths.output,
        filename: paths.jsOutput
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['babel-preset-env'] }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                              require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: paths.cssOutput }),
        new CopyWebpackPlugin([
            {
                from: 'src/assets/fonts/',
                to: 'assets/fonts/[name].[ext]'
            },
            {
                from: 'src/assets/images/',
                to: 'assets/images/[name].[ext]'
            }
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '90'
            }
        })
    ]
};
