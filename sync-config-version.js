// Runs as the npm "version" script: copies the version that `npm version`
// just wrote to package.json onto the <widget> in config.xml, then stages
// config.xml so it lands in the same version commit.
const fs = require("fs");
const { execFileSync } = require("child_process");

const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
const xml = fs.readFileSync("config.xml", "utf8");
const pattern = /(<widget\b[^>]*?\sversion=)(["'])[^"']*\2/;
if (!pattern.test(xml)) {
  console.error("sync-config-version: no version attribute on <widget> in config.xml");
  process.exit(1);
}
fs.writeFileSync("config.xml", xml.replace(pattern, `$1$2${version}$2`));
execFileSync("git", ["add", "config.xml"], { stdio: "inherit" });
console.log(`config.xml version -> ${version}`);
