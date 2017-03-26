const HtmlWebpackPlugin = require('html-webpack-plugin');
let LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
    entry: {
        app: './source/index.jsx',
    },
    output: {
        path: `${__dirname}/../docs`,
        filename: 'js/bundle.js',
        publicPath: '',
    },
    devServer: {
        port: 8080,
        contentBase: 'docs/',
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {test: /\.(png|gif|jpg)(\?.*$|$)/, loader: 'url-loader?limit=100000&name=images/[hash].[ext]'},
            {test: /\.(json)(\?.*$|$)/, loader: 'json-loader'},
            {test: /\.(html)(\?.*$|$)/, loader: 'html-loader'},
            // Font Definitions
            {
                test: /\.(svg)(\?.*$|$)/,
                loader: 'url-loader?limit=650&mimetype=image/svg+xml&name=fonts/[name].[ext]'
            },
            {
                test: /\.(woff)(\?.*$|$)/,
                loader: 'url-loader?limit=650&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.(woff2)(\?.*$|$)/,
                loader: 'url-loader?limit=650&mimetype=application/font-woff2&name=fonts/[name].[ext]'
            },
            {
                test: /\.([ot]tf)(\?.*$|$)/,
                loader: 'url-loader?limit=650&mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                test: /\.(eot)(\?.*$|$)/,
                loader: 'url-loader?limit=650&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',
            filename: './index.html',
            favicon: './source/images/phone.png',
        }),
        new LodashModuleReplacementPlugin(),
    ],
};
