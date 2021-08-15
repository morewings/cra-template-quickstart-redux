const fs = require('fs');
const pkg = require('./package.json');

const excludedPackages = ['react', 'react-dom', 'react-scripts'];

const excludedScripts = [
  'clean:files',
  'copy:files',
  'prepublishOnly',
  'write:template',
  'start:docs',
  'build:docs',
  'start',
  'build',
  'eject',
];

const cleanConfig = (items, excluded) => {
  const result = {...items};
  excluded.forEach(name => {
    delete result[name];
  });
  return result;
};

const dependencies = cleanConfig(
  {
    ...pkg.dependencies,
  },
  excludedPackages
);

const scripts = cleanConfig({...pkg.scripts}, excludedScripts);

const template = {
  package: {
    dependencies,
    scripts: {
      prepare: 'husky install',
      ...scripts,
    },
  },
};

fs.writeFileSync('template.json', JSON.stringify(template, null, 2));
