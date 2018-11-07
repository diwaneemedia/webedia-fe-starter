var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    dirs = require('./dirs.js');

module.exports = {
    entry: dirs.entry,
    output: {
        path: dirs.output,
        filename: dirs.jsOutput
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, 'postcss.config.js')
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [ new ExtractTextPlugin(dirs.cssOutput) ]
};
