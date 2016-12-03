const webpack = require('webpack');

const plugins = [new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }})];

const config = {
    entry: {
        './index': './src/index'
    },
    devtool: 'source-map',
    output: {
        path: './',
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            // Support for ES6 modules and the latest ES syntax.
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
},
    resolve: {
        extensions: ['.js']
    },
    plugins: plugins
};

module.exports = config;
