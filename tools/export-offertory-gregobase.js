#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const { ReviewStore } = require('./offertory-review-store');
const store = new ReviewStore();
const result = store.exportFiles();
const archive = path.join(store.base,'publication/offertoriale-gregobase-drafts.zip');
if(fs.existsSync(archive))fs.unlinkSync(archive);
const zipped = cp.spawnSync('zip',['-q','-j',archive,...result.chants.map(e=>path.join(result.directory,e.id+'.gabc')),path.join(store.base,'publication/manifest.json'),path.join(store.base,'gregobase-plan.md')],{encoding:'utf8'});
if(zipped.status !== 0)throw new Error('Could not create the draft archive: '+zipped.stderr);
console.log(`Prepared ${result.chants.length} complete drafts in ${result.directory}.`);
console.log(`Archive: ${archive}`);
console.log(`${result.chants.filter(e=>e.ready).length} have both exact-file review checks. No scores have been submitted.`);
