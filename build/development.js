const config = require('./config');

module.exports = Object.assign(config, {
    debug: true,
    // html页面引用JS/CSS文件的前缀路径
    resUrlPre: `//127.0.0.1:8081/${config.releaseFolder}/`
});
