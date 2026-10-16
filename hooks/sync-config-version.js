// Cordova before_prepare hook (declared in config.xml): copies the version in
// package.json onto <widget version> in config.xml, so the app is built with
// whatever version package.json has, however it got there (npm version on
// master, a merge, a hand edit).
const fs = require("fs");
const path = require("path");

module.exports = function (context) {
  const root = context.opts.projectRoot;
  const configPath = path.join(root, "config.xml");
  const { version } = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  // Cordova turns this into the iOS short version (digits and dots only) and the
  // Android versionCode, which can't tell a prerelease from its release.
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`sync-config-version: package.json version "${version}" must be plain major.minor.patch for the app`);
  }
  const xml = fs.readFileSync(configPath, "utf8");
  let found = false;
  const updated = xml.replace(/(<widget\b[^>]*?\sversion=)(["'])[^"']*\2/, (m, attr, quote) => {
    found = true;
    return attr + quote + version + quote;
  });
  if (!found) throw new Error("sync-config-version: no version attribute on <widget> in config.xml");
  if (updated !== xml) {
    fs.writeFileSync(configPath, updated);
    console.log(`config.xml version -> ${version}`);
  }
};
