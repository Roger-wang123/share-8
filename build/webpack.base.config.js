const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path')

module.exports = {
    entry: {
        'index': path.resolve(__dirname, '../src/script/index.ts'),
        'srcset': path.resolve(__dirname, '../src/script/srcset.ts')
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.vue$/i,
                loader: 'vue-loader',
                options: {
                    reactivityTransform: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/srcset.html',
            filename: 'srcset.html',
            chunks: ['srcset']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new VueLoaderPlugin()
    ]
}