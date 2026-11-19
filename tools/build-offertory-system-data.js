// Rebuild the browser's PDF-system alignment data; no PDF or GABC is changed.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const file = path.join(root,'offertory-review/gabc-map.js');
const data = JSON.parse(fs.readFileSync(path.join(root,'data/offertory-verses/system-alignment.json'),'utf8'));
const block = '/* SYSTEM_DATA_START */\n  const systems = '+JSON.stringify(data).replace(/</g,'\\u003c')+';\n  /* SYSTEM_DATA_END */';
const source = fs.readFileSync(file,'utf8');
if(!source.includes('/* SYSTEM_DATA_START */'))throw new Error('Missing alignment data marker');
fs.writeFileSync(file,source.replace(/\/\* SYSTEM_DATA_START \*\/[\s\S]*?\/\* SYSTEM_DATA_END \*\//,block));
console.log('Updated PDF alignment for '+Object.keys(data.entries).length+' chants.');
