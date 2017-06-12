const path = require('path');

// 工程目录
const projectDir = path.resolve(__dirname, '../');
// JS/CSS构建后发布到的文件夹
const releaseFolder = 'dist';

module.exports = {
    dir: {
        // JS/CSS构建后发布html目录（绝对路径）
        html: path.resolve(__dirname, '../koa-demo/server/views/res'),
        // 工程目录（绝对路径）
        project: projectDir,
        // JS/CSS构建后发布到到目录（绝对路径）
        release: path.resolve(projectDir, releaseFolder),
        // JS/CSS源文件目录
        src: path.resolve(projectDir, 'src'),
        // 模板源文件目录
        tpl: path.resolve(projectDir, 'src/tpl')
    },
    // JS/CSS构建后发布到的文件夹
    releaseFolder: releaseFolder,
    // 图片构建后发布到的文件夹
    imgFolder: 'images',
    // 字体构建后发布到的文件夹
    fontFolder: 'fonts'
}
