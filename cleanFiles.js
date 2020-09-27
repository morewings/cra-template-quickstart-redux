const rimraf = require('rimraf');
const {files, husky, templateDir, templateFile} = require('./templateFiles');

const cleanDir = () => {
  [...files, husky.template].forEach(path => {
    try {
      rimraf.sync(`${templateDir}/${path}`);
    } catch (err) {
      console.error(err);
    }
  });
  rimraf.sync(`${templateFile}`);
};

cleanDir();
