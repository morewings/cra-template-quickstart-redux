const pkg = require('./package.json');

module.exports = {
  plugins: [
    require('postcss-nested'), // handle nested selectors, like LESS or SASS
    require('postcss-preset-env')({
      browsers: pkg.browserslist.production, // use browsers list from production mode
      stage: 1,
    }),
  ],
};
