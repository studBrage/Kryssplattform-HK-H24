// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

const ALIASES = {
  'react-native-maps': '@teovilla/react-native-web-maps',
};

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });
config.resolver.sourceExts.push("cjs")

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    // The alias will only be used when bundling for the web.
    return context.resolveRequest(context, ALIASES[moduleName] ?? moduleName, platform);
  }
  // Ensure you call the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
// module.exports = config;
