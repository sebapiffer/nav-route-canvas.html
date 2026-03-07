const fs = require('fs');
console.log(fs.statSync('app').isDirectory());
console.log(fs.readdirSync('app'));
