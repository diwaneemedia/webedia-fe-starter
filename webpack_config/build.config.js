const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
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
    plugins: [ new MiniCssExtractPlugin({ filename: paths.cssOutput }) ]
};
