const fs = require('fs');
const csv = require('csv-parser');

const results = {};

fs.createReadStream('andAndAnd.csv')
  .pipe(csv())
  .on('data', (row) => {
    const versionId = row.versionId;
    const id = row.id;

    if (!results[versionId]) {
      results[versionId] = {};
    }

    results[versionId][id] = {
      pattern: row.pattern.split(';').map(Number),
      hasCycle: row.hasCycle === 'TRUE',
      initialValue: parseInt(row.initialValue, 10),
    };

    if (row.cycles !== 'NA') {
      results[versionId][id].cycles = parseInt(row.cycles, 10);
    }
  })
  .on('end', () => {
    console.log(JSON.stringify(results, null, 2));
  });
