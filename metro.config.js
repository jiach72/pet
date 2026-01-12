const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 确保字体文件被正确打包
config.resolver.assetExts.push('ttf', 'otf');

module.exports = config;
