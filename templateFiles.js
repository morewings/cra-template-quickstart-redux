module.exports = {
  husky: {
    config: '.huskyrc',
    template: 'huskyrc-template',
  },
  templateFile: 'template.json',
  templateDir: './template',
  files: [
    '.env',
    '.eslintrc',
    '.lintstagedrc',
    '.nvmrc',
    '.prettierrc',
    '.stylelintrc',
    'prepare.js',
    'jsconfig.json',
    'README.md',
    'public',
    'src',
  ],
};
