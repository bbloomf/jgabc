// Generate inputs using the real propers.js transformations, then exercise the
// actual Exsurge renderer through the visible browser audit page.
const fs = require('fs');
const path = require('path');
const { cases } = require('../tests/helpers/offertory-feature-cases');
const { unlinkedCases } = require('../tests/helpers/offertory-unlinked-cases');
const inputs = [...cases()].map(c => ({ id:c.id, sourceId:c.sourceId, name:c.name, style:c.style, count:c.count, verses:c.expected.length, gabc:c.formatted }));
inputs.push(...[...unlinkedCases()].map(({text, ...c}) => c));
const output = path.join(__dirname, '../tests/fixtures/offertory-feature-inputs.json');
fs.writeFileSync(output, JSON.stringify(inputs));
console.log(`Prepared ${inputs.length} browser inputs at ${output}`);
