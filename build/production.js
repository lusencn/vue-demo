const config = require('./config');

// 静态资源访问域名
const domain = '127.0.0.1:8081';

module.exports = Object.assign(config, {
    debug: false,
    // html页面引用JS/CSS文件的前缀路径
    resUrlPre: `//${domain}/${config.releaseFolder}/`,
    // 图片文件的前缀路径
    imgUrlPre: `//${domain}/${config.imgFolder}/`,
    // 字体文件的前缀路径
    fontUrlPre: `//${domain}/${config.fontFolder}/`
});
