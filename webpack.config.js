const merge = require('webpack-merge');
const {resolve, join} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _mode = process.env.NODE_ENV || "development";
const _modeflag = _mode == "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const net = process.env.NET;
const base = {
    entry: {
        app: resolve("src/web/index.js")
    },
    output: {
        path: join(__dirname, "./dist/assets"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx)$/,
                include: [resolve("src")],
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin与style-loader冲突
                    // MiniCssExtractPlugin.loader,把 js 中 import 导入的样式文件代码，打包成一个实际的 css 文件，
                    // 结合 html-webpack-plugin，在 dist/index.html 中以 link 插入 css 文件；默认将 js 中 import 的多个 css 文件，打包时合成一个
                    // style-loader:将样式自动插入到<style>标签中
                    "style-loader",
                    //modules:true :local(class){局部样式}
                    //modules:"global" :global(class){全局样式}
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1, //css-loader之前设置多少个loader
                            // modules: true
                        }
                    }
                ]
            },
            {
                // pure css config
                test: /\.less$/,
                /*include: [
                    join(__dirname, './src/web/assets/commonstyle')
                ],*/
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    "less-loader"
                ]
            },
            /*{
                //module css config
                test: /\.less$/,
                exclude: [
                    join(__dirname, './src/web/assets/commonstyle')
                ],
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    "less-loader"
                ]
            }*/
        ]
    },
    optimization: {
        minimize: _modeflag,
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: "commons"
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _modeflag
                ? "styles/[name].[contenthash:5].css"
                : "styles/[name].css",
            chunkFilename: _modeflag
                ? "styles/[name].[contenthash:5].css"
                : "styles/[name].css"
        })
    ],
    resolve: {
        alias: {
            '@utils': join(__dirname, './src/web/utils'),
            '@constants': join(__dirname, './src/web/constants'),
            '@common': join(__dirname, './src/web/components'),
            '@pages': join(__dirname, './src/web/pages'),
            '@': join(__dirname, './src/web')
        }
    }
};

module.exports = merge(base, _mergeConfig);
