const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const envConfig = require('../env');
const config = require('../' + envConfig.env);

const debug = config.debug;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// 页面入口文件配置
const entry = {
    todo: path.resolve(config.dir.src, './index.js')
}

// 文件路径是否带上chunkhash信息
const resolveChunkHashName = function(ext = 'js') {
    return (debug ? '[name]' : '[name]/[chunkhash:8]') + '.' + ext;
}

// 文件路径是否带上contenthash信息
const resolveContentHashName = function(ext = 'css') {
    return (debug ? '[name]' : '[name]/[contenthash:8]') + '.' + ext;
}

module.exports = {
    // 页面入口文件配置
    entry: Object.assign({}, entry, {
        lib: ['vue']
    }),
    // 构建后输出路径相关配置
    output: {
        // 构建后文件输出目录
        path: config.dir.release,
        // html页面引用JS/CSS文件的前缀路径
        publicPath: config.resUrlPre,
        // 构建后入口文件的相对路径
        filename: resolveChunkHashName('js'),
        // 构建后动态加载文件的相对路径
        chunkFilename: resolveChunkHashName('js'),
    },
    module: {
        rules: [{
            // 根据.babelrc配置转换JS文件
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            // 将CSS构建合并到一个文件
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            // 因CSS构建后的路径变化，将CSS中图片的路径修改为指定路径，并将图片复制到对应目录
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: config.imgUrlPre + '/' + resolveChunkHashName('[ext]')
            }
        }, {
            // 因CSS构建后的路径变化，将CSS中字体的路径修改为指定路径，并将字体复制到对应目录
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: config.fontUrlPre + '/' + resolveChunkHashName('[ext]')
            }
        }]
    },
    resolve: {
        alias: {
            'fe-util': 'lib/util',
            'vue-widget': 'lib/widget',
            'vue$': 'vue/dist/vue.common.js'
        },
        extensions: [
            '.js', '.jsx', '.vue'
        ],
        modules: [config.dir.src, 'node_modules']
    },
    plugins: (() => {
        let arr = [
            // 将chunks中对应的entry所引用的公共文件提取出来，chunk名为common
            new CommonsChunkPlugin({name: 'common', chunks: Object.keys(entry)}),
            new CommonsChunkPlugin({
                name: 'lib',
                filename: 'lib.js',
                chunks: ['lib', 'common']
            }),
            // 将JS代码中引用的CSS文件，合并提取成一个CSS文件
            new ExtractTextPlugin({
                filename: config.cssFolder + '/' + resolveContentHashName('css'),
                allChunks: true
            })
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
                compress: {warnings: false}
            })
        );

        // 将构建生成的JS文件添加到指定html文件中
        Object.keys(entry).forEach(chunk => {
            arr.push(new HtmlWebpackPlugin({
                template: path.join(config.dir.tpl, 'index.html'),
                filename: path.join(config.dir.release, `${chunk}.html`),
                inject: true,
                chunks: ['lib', 'common', chunk]
            }));
        });

        Object.keys(entry).forEach(chunk => {
            arr.push(new HtmlWebpackPlugin({
                chunks: [chunk],
                filename: path.resolve(config.dir.html, `${chunk}_css.html`),
                inject: false,
                template: path.resolve(config.dir.tpl, 'css.html')
            }));

            arr.push(new HtmlWebpackPlugin({
                chunks: [
                    'lib', 'common', chunk
                ],
                filename: path.resolve(config.dir.html, `${chunk}_js.html`),
                inlineNames: ['jsInline'],
                inject: false,
                template: path.resolve(config.dir.tpl, 'js.html')
            }));
        });

        return arr;
    })()
};
