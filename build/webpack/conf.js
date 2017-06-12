const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const envConfig = equire('../env');
const config = require('../' + envConfig.env);

const debug = config.debug;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// 页面入口文件配置
const entry = {
    index: path.resolve(config.dir.src, 'index.js'),
    lib: ['vue']
}

module.exports = {
    // 页面入口文件配置
    entry: entry,
    // 构建后输出路径相关配置
    output: {
        // 构建后文件输出目录
        path: config.dir.release,
        // html页面引用JS/CSS文件的前缀路径
        publicPath: config.resUrlPre,
        // 构建后入口文件的相对路径
        filename: debug ? '[name].js': '[name]/[chunkhash].js',
        // 构建后动态加载文件的相对路径
        chunkFilename: debug ? '[name].js' : '[name]/[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            // 因CSS构建后的路径变化，将CSS中图片的路径修改为指定路径，并将图片复制到对应目录
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: `${config.imgUrlPre}/[name]${debug ? '' : '/[hash:8]'}.[ext]`
            }
        }, {
            // 因CSS构建后的路径变化，将CSS中字体的路径修改为指定路径，并将字体复制到对应目录
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: `${config.fontUrlPre}/[name]${debug ? '' : '/[hash:8]'}.[ext]`
            }
        }]
    },
    resolve: {
        alias: {
            'fe-util': 'lib/util',
            'vue-widget': 'lib/widget'
        },
        extensions: ['.js', '.jsx', '.vue'],
        modules: [config.dir.src, 'node_modules']
    },
    plugins: (() => {
        let arr = [
            // 将chunks中对应的entry所引用的公共文件提取出来，chunk名为common
            new CommonsChunkPlugin({
                name: 'common',
                chunks: Object.keys(entry)
            }),
            new CommonsChunkPlugin({
                name: 'lib',
                filename: 'lib.js',
                chunks: ['lib', 'common']
            })
            // 将JS代码中引用的CSS文件，合并提取成一个CSS文件
            /*new ExtractTextPlugin(
                debug ? '[name].css' : '[name]/[contenthash:8].css',
                {allChunks: true}
            )*/
        ];

        !debug && arr.push(
            // 设置webpack环境变量
            new DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"' + envConfig.env + '"'
                }
            }),
            // JS文件压缩（去空格注释，变量替换）
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );

        // 将构建生成的JS文件添加到指定html文件中
        /*Object.keys(entry).forEach(chunk => {
            arr.push(new HtmlWebpackPlugin({
                template: path.join(config.dir.tpl, 'index.html'),
                filename: path.join(config.dir.release, `${chunk}.html`),
                inject: true,
                chunks: ['lib', 'common', chunk]
            }));
        });*/

        Object.keys(entry).forEach(chunk => {
            arr.push(new HtmlWebpackPlugin({
                chunks: [chunk],
                filename: path.resolve(config.dir.html, `${chunk}_css.html`),
                inject: false,
                template: path.resolve(config.dir.tpl, 'css.html')
            }));

            arr.push(new HtmlWebpackPlugin({
                chunks: ['lib', 'common', chunk],
                filename: path.resolve(config.dir.html, `${chunk}_js.html`),
                inlineNames: ['jsInline'],
                inject: false,
                template: path.resolve(config.dir.tpl, 'js.html')
            }));
        });

        return arr;
    })()
}
