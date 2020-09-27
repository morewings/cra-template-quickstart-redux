const fs = require('fs');
const pkg = require('./package.json');

const cleanScripts = (scripts, propName) => {
  const newScripts = {...scripts};
  delete newScripts[propName];
  return newScripts;
};

const newPackage = {
  ...pkg,
  scripts: cleanScripts(pkg.scripts, 'prestart'),
};

fs.writeFileSync('package.json', JSON.stringify(newPackage, null, 2));
fs.renameSync('huskyrc-template', '.huskyrc');
fs.unlinkSync('prepare.js');
