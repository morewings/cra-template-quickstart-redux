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
    'jsconfig.json',
    'README.md',
    'README_CRA.md',
    'public',
    'src',
  ],
};
