const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      WebpackBuildNotifierPlugin = require('webpack-build-notifier'),
      path = require('path'),
      paths = require('./paths.js');

module.exports = {
    entry: paths.entry,
    output: {
        path: paths.output,
        filename: paths.jsOutput
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            // ----- JS ES2015 compiling
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['babel-preset-env'] }
                }
            },
            // ----- SCSS compiling
            {
                test: /\.scss$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            outputStyle: "expanded",
                            sourceMapContents: true
                        }
                    }
                ]
            }
        ]
    },
    // ----- Webpack dev server options
    devServer: {
        contentBase: paths.output,
        watchContentBase: true,
        compress: true,
        port: 3300,
        stats: {
            all: false,
            errors: true,
            warnings: true
        },
        open: true
    },
    plugins: [
        // ----- Output compiled css file
        new MiniCssExtractPlugin({
            filename: paths.cssOutput,
            allChunks: true
        }),
        new WebpackBuildNotifierPlugin({
            title: "Webpack",
            suppressSuccess: false
        })
    ]
};
