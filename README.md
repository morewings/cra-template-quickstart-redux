[![Build Status](https://travis-ci.com/morewings/cra-template-quickstart-redux.svg?branch=master)](https://travis-ci.com/morewings/cra-template-quickstart-redux)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=morewings/cra-template-quickstart-redux)](https://dependabot.com)
[![dependencies Status](https://david-dm.org/morewings/cra-template-quickstart-redux/status.svg)](https://david-dm.org/morewings/cra-template-quickstart-redux)
[![npm version](https://badge.fury.io/js/cra-template-quickstart-redux.svg)](https://www.npmjs.com/package/cra-template-quickstart-redux)
[![npm](https://img.shields.io/npm/dm/cra-template-quickstart-redux)](https://www.npmjs.com/package/cra-template-quickstart-redux)

# Quickstart Redux Create React App template

Opinionated quickstart [Create React App](https://github.com/facebook/create-react-app) (CRA) template with Redux, React Testing Library, eslint and stylelint configurations.

See [full documentation](https://cra-template-quickstart-redux.netlify.app).

Original Create React App README available [here](./README_CRA.md)

## Usage

```shell script
npx create-react-app %PROJECT_NAME% --template quickstart-redux
``` 
Or
```shell script
yarn create react-app %PROJECT_NAME% --template quickstart-redux
```

`npx` command installs most recent stable version of CRA from npm. `--template` parameter points to this template, note that `cra-template-` prefix is omitted.

Then

```shell script
cd %PROJECT_NAME%
yarn start
```

## Motivation

I use Create React App pretty much often. But I hate to write same boilerplate code to make Redux working and configure some other useful stuff again and again. This template contains test and eslint configurations and Redux boilerplate code, required for rapid start of your fabulous project.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all configuration is done by adding config files where possible.

## Redux

Template provides basic Redux configuration with [feature based](https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks) folder structure. You can use [Redux devtools browser extension](http://extension.remotedev.io/). Template has examples of sync (`src/features/counter`) and async (`src/features/random`) Redux features and tests for them.

## Git hooks

Git hooks management is provided by [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).

Thus every time you commit something `husky` will run `eslint --fix` command  on staged files, preventing you from committing badly formatted code. You can change or disable this behavior inside `.linstagedrc` config file. Before each push tests will run in the same manner. 

### Caveats

- If pre-commit hooks not work (e. g. your code is not linted after commit), run ``yarn add husky`` in your project folder.

- You need to [update snapshots](https://jestjs.io/docs/en/snapshot-testing#updating-snapshots) and fix failing tests to be able to commit or push your code.

## Testing

Snapshot testing done with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro). Example tests are included. Redux connected components are tested with [redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store) and [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter).

## Code quality tools

Code quality tools provide static check of your code and try to fix errors. Checks are triggered inside pre-commit hook. To run them manually:

```shell script
yarn lint:js # runs eslint in src directory
yarn fix:js # runs eslint in src directory with --fix parameter
yarn lint:style # runs stylelint in src directory
yarn fix:style # runs stylelint in src directory with --fix parameter
```

### eslint

Template extends [CRA eslint rules](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app) with custom set, tailored for reasonable and clean development process. I added `prettier` to force consistent formatting and `eslint-plugin-fp` to avoid accidental mutations. Don't like trailing semicolons? Feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside `.prettierrc` file to match your code style.

Eslint rules are commented for your convenience, feel free to tweak or remove them. No judgement.

```js
// Allow jsx tags inside .js files.
"react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
// Disable props spreading (<App {...props} />) warning.
"react/jsx-props-no-spreading": 0,
// Throw warning instead of error when using array index as a key.
"react/no-array-index-key": 1,
// Allow modules with named exports only.
"import/prefer-default-export": 0,
// Force {foo: 'bar'} object literal syntax.
"object-curly-spacing": ["error", "never"],
// Throw warning instead of error when function is not properly formatted. 
// Feel free to choose your favorite option https://eslint.org/docs/rules/arrow-body-style
"arrow-body-style": ["warn", "as-needed"],
// Make prettier code formatting suggestions more verbose.
"prettier/prettier": ["warn"],
// Throw warning when <a href="#"> or <a href="javascript:void(0)"> are used.
// Use <button> instead.
"jsx-a11y/anchor-is-valid": ["warn", {"aspects": ["invalidHref"]}],
// Allow using (props) => <Component /> and ({propName}) => <Component /> syntax.
"react/destructuring-assignment": "off",
// Disable <Fragment> => <> replacement. Feel free to change
"react/jsx-fragments": "off",
// Below is the set of functional rules to warn developer about accidental mutations, 
// which may cause error in reducers etc.
// No delete operator.
"fp/no-delete": "warn",
// Warning when Object.assign(a, b) used, since it mutates first argument.
// Object.assign({}, a, b) is ok.
"fp/no-mutating-assign": "warn",
// Warning when mutating method (pop, push, reverse, shift, sort, splice, unshift, etc) 
// is used. Ramda and lodash/fp are allowed (_.pop, R.push)
"fp/no-mutating-methods": [
  "warn",
  {
    "allowedObjects": ["_", "R"]
  }
],
// Warning when mutating operators (++, --, etc) are used, object = {} also. 
// `Component.propTypes`, `Component.defaultProps`, common.js (`module.exports`)
// and `ref.current` are ok.
"fp/no-mutation": [
  "warn",
  {
    "commonjs": true,
    "allowThis": true,
    "exceptions": [{"property": "propTypes"}, {"property": "defaultProps"}, {"property": "current"}]
  }
]
```

### stylelint

Template includes [stylelint](https://stylelint.io/), to check CSS/SASS/LESS files. We are using [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard) rule set extended with:

```js
// Check `calc` functions formatting, required for `calc` to work in IE11
"function-calc-no-unspaced-operator": true,
// Custom rules (aka CSS vars) should go first
"order/order": [
  "custom-properties",
  "declarations"
],
// Require rules to be in alphabetical order
"order/properties-alphabetical-order": true,
// Disallow vendor prefixes, since CRA has autoprefixer enabled
"property-no-vendor-prefix": true,
"media-feature-name-no-vendor-prefix": true,
"at-rule-no-vendor-prefix": true,
"selector-no-vendor-prefix": true,
// Limit rules nesting for readablity purposes
"max-nesting-depth": 3,
// Limit selector complexity for readablity purposes
"selector-max-compound-selectors": 5
```
Stylelint errors don't prevent build of application in development mode.

## Styling

Template uses vanilla CSS with `autoprefixer` enabled. To avoid classname collisions and reduce nesting we are using `css-modules`. To make css-modules work, stylesheet file name should have `.module` suffix.

```js
import React from 'react';
import classes from './Component.module.css';

const Component = () => (
  <div className={classes.wrapper}>Component</div>
)
```

CRA doesn't support style pre-processors except SASS. But this doesn't mean, that we shouldn't use them. In order to add support for custom style processor without ejecting, we can use file watchers. File watchers will track changes in style files and compile them to vanilla CSS, consumed by CRA.

### SASS/SCSS

SASS/SCSS support comes "out of the box" in CRA. To enable it:

1. Install `node-sass`

    ```shell script
    yarn add node-sass --dev
    ```

2. Import SASS/SCSS files straight into Component.

    ```js
    import React from 'react';
    import classes from './Component.module.scss'; // note the changed extension
    
    const Component = () => (
      <div className={classes.wrapper}>Component</div>
    )
    ``` 
3. Change `.lintstagedrc` to lint `scss` files instead of `css`.

    ```json
    {
      "*.js": [
        "eslint --fix"
      ],
      "*.scss": [
        "stylelint --fix"
      ]
    }
    ```

You can see all changes required to enable SASS/SCSS in [corresponding PR](https://github.com/morewings/cra-template-quickstart-redux/pull/16).

### PostCSS watcher

1. Install `postcss-cli` and related plugins:
    ```shell script
    yarn add --dev postcss-nested postcss-cli postcss-preset-env npm-run-all 
    ```
2. Modify package scripts:

    ```json
    {
        "build:style": "postcss src/**/*.pcss --dir src --base src --ext css",
        "watch:style": "yarn build:style -w",
        "start": "npm-run-all -p watch:style start:js",
        "start:js": "react-scripts start",
        "build:js": "react-scripts build",
        "build": "npm-run-all build:style build:js"
    }
    ```
3. Add `postcss.config.js` file in the root folder. With following configuration:

    ```js
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
    ```
4. Add rule to `.gitignore` and `.stylelintrc` to ignore all css files, since we are generating them.

    #### .gitignore
    
    ```gitignore
    # css
    *.css
    ```
   
   #### .stylelintrc
       
   ```json
    {
    "ignoreFiles": ["**/*.snap", "**/*.css"]
    }
   ```
5. Change `.lintstagedrc` to lint `pcss` files instead of `css`.

    ```json
    {
      "*.js": [
        "eslint --fix"
      ],
      "*.pcss": [
        "stylelint --fix"
      ]
    }
    ```
   
You can see all changes required to enable PostCSS in [corresponding PR](https://github.com/morewings/cra-template-quickstart-redux/pull/15).

### Less watcher

1. Install `less` and related plugins:
    ```shell script
    yarn add --dev less less-watch-compiler npm-run-all 
    ```
2. Modify package scripts:

    ```json
    {
        "build:style": "yarn watch:style --run-once",
        "watch:style": "less-watch-compiler src src",
        "start": "npm-run-all -p watch:style start:js",
        "start:js": "react-scripts start",
        "build:js": "react-scripts build",
        "build": "npm-run-all build:style build:js"
    }
    ```
3. Add rule to `.gitignore` and `.stylelintrc` to ignore all css files, since we are generating them.

    #### .gitignore
    
    ```gitignore
    # css
    *.css
    ```
   
   #### .stylelintrc
       
   ```json
    {
    "ignoreFiles": ["**/*.snap", "**/*.css"]
    }
   ```
4. Change `.lintstagedrc` to lint `less` files instead of `css`.

    ```json
    {
      "*.js": [
        "eslint --fix"
      ],
      "*.less": [
        "stylelint --fix"
      ]
    }
    ```
   
You can see all changes required to enable Less in [corresponding PR](https://github.com/morewings/cra-template-quickstart-redux/pull/17).

## Absolute imports

You can use source folder relative paths for imports. `import Component from './../../../../../../src/components/Component'` becomes `import Component from 'components/Component'`. Configuration is inside `jsconfig.json` file. You will love it 💖!

## Contents

```shell script
├── .env # dotenv config file
├── .eslintrc # eslint configutation
├── .lintstagedrc # lintstaged configutation
├── .nvmrc # required Node version
├── .prettierrc # prettier configutation
├── .stylelintrc # stylelint configutation
├── README.md # this file
├── README_CRA.md # original Readme from CRA
├── .gitignore
├── huskyrc-template # template for husky configuration
├── jsconfig.json # absolute path configuration
├── public # public assets
└── src
    ├── components # React components folder
    ├── config.js # shared config file
    ├── features # features logic folder
    ├── index.css
    ├── index.js # entry point file
    ├── serviceWorker.js # service worker boilerplate
    ├── setupTests.js # configuration ti run jest tests
    ├── withProvider.js # utility to generate Provider components
    └── withReduxFeatures.js # Redux store HOC
```
