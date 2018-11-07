var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackBuildNotifierPlugin = require('webpack-build-notifier'),
    path = require('path'),
    dirs = require('./dirs.js');

module.exports = {
    entry: dirs.entry,
    output: {
        path: dirs.output,
        filename: dirs.jsOutput
    },
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
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: "css-loader", options: { sourceMap: true, url: false } },
                        // { loader: "postcss-loader", options: { sourceMap: true } },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                outputStyle: "expanded",
                                sourceMapContents: true
                            }
                        }
                    ]
                }))
            }
        ]
    },
    // ----- Webpack dev server options
    devServer: {
        contentBase: dirs.output,
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
        new ExtractTextPlugin({
            filename: dirs.cssOutput,
            allChunks: true
        }),
        new WebpackBuildNotifierPlugin({
            title: "Webpack",
            suppressSuccess: false
        })
    ]
};
