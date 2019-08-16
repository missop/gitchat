const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
    output: {
        filename: "scripts/[name].bundule.js"
    },
    devServer: {
        port: "8022",
        host: "localhost",
        proxy: {
            /*"/api": {
                target: "http://127.0.0.1:3000",
                pathRewrite: {"^/api": ""} // 将/api重写为""空字符串
            }*/
            "/api": {
                target: "http://127.0.0.1:3000"
            }
        },
        /*contentBase vs publicPath
        * publicPath:把静态资源打到哪里，例如index.html为根路径
        * contentBase:从哪里访问静态资源
        * */
        // publicPath: '/',
        contentBase: path.join(__dirname, "../dist/assets"),
        stats: {
            color: true
        },
        compress: true,
        historyApiFallback: true,
        hot: true,
        quiet: true,
        https: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "gitchat",
            filename: "index.html",
            template: path.resolve(__dirname, "../src/web/index.html")
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ["You application is running here http://localhost:8022"]
            },
            clearConsole: true,
            onErrors: (severity, errors) => {
                const error = errors[0];
                new WebpackBuildNotifierPlugin({
                    title: "gitchat环境配置",
                    suppressSuccess: true
                });
            }
        })
    ]
}
