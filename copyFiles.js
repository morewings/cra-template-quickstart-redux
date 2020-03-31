const copy = require('recursive-copy');
const {files, husky, templateDir} = require('./templateFiles');

const copyFiles = () => {
  [...files, husky.config].forEach(async path => {
    const destination =
      path !== husky.config
        ? `${templateDir}/${path}`
        : `${templateDir}/${husky.template}`;
    try {
      await copy(path, destination, {
        overwrite: true,
      });
    } catch (e) {
      console.warn(path, e);
    }
  });
};

copyFiles();
