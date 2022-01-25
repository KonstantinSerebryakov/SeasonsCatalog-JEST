const Path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: Path.resolve(__dirname, '../src/scripts/index.js'),
    },
    output: {
        path: Path.join(__dirname, '../build'),
        filename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({patterns: [{from: Path.resolve(__dirname, '../public'), to: 'public'}]}),
        //guest
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: Path.resolve(__dirname, '../src/pages/index.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'page.html',
            template: Path.resolve(__dirname, '../src/pages/pages.html'),
        }),
        //admin home page
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: Path.resolve(__dirname, '../src/pages/admin/index.html'),
        }),
        // creation
        new HtmlWebpackPlugin({
            filename: 'admin/create/page.html',
            template: Path.resolve(__dirname, '../src/pages/admin/pages.html'),
        }),
        // edition
        new HtmlWebpackPlugin({
            filename: 'admin/edit/list.html',
            template: Path.resolve(__dirname, '../src/pages/admin/edition/list.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'admin/edit/page.html',
            template: Path.resolve(__dirname, '../src/pages/admin/pages.html'),
        }),
        // deletion
        new HtmlWebpackPlugin({
            filename: 'admin/delete/list.html',
            template: Path.resolve(__dirname, '../src/pages/admin/deletion/list.html'),
        }),
        // display
        new HtmlWebpackPlugin({
            filename: 'admin/look/list.html',
            template: Path.resolve(__dirname, '../src/pages/admin/display/list.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'admin/look/page.html',
            template: Path.resolve(__dirname, '../src/pages/pages.html'),
        }),
    ],
    resolve: {
        alias: {
            '~': Path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            },
        ],
    },
};
