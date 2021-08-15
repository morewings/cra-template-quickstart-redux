const copy = require('recursive-copy');
const {files, templateDir} = require('./templateFiles');

const copyFiles = () => {
  [...files].forEach(async path => {
    const destination = `${templateDir}/${path}`;
    try {
      await copy(path, destination, {
        overwrite: true,
      });
    } catch (e) {
      console.warn(path, e);
    }
  });
};

const renameGitignore = async () => {
  try {
    await copy('.gitignore', `${templateDir}/gitignore`, {
      overwrite: true,
    });
  } catch (e) {
    console.warn('can`t copy gitignore', e);
  }
};

copyFiles();
renameGitignore();
