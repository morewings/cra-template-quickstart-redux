[![Build Status](https://travis-ci.org/morewings/cra-template-quickstart-redux.svg?branch=master)](https://travis-ci.org/morewings/cra-template-quickstart-redux)
[![dependencies Status](https://david-dm.org/morewings/cra-template-quickstart-redux/status.svg)](https://david-dm.org/morewings/cra-template-quickstart-redux)
[![npm version](https://badge.fury.io/js/cra-template-quickstart-redux.svg)](https://badge.fury.io/js/cra-template-quickstart-redux)
![npm](https://img.shields.io/npm/dm/cra-template-quickstart-redux)

# Quickstart Redux Create React App template

Opinionated quickstart [Create React App](https://github.com/facebook/create-react-app) (CRA) template with Redux, enzyme and custom eslint configuration.

Original Create React App README available [here](./README_CRA.md)

## Usage

``npx create-react-app %PROJECT_NAME% --template quickstart-redux`` 

Or

``yarn create react-app %PROJECT_NAME% --template quickstart-redux``

`npx` command installs most recent stable version of CRA from npm. `--template` parameter points to this template, note that `cra-template-` prefix is omitted.

## Motivation

I use Create React App pretty much often. But I hate to write same boilerplate code to make Redux working and configure some other useful stuff again and again. This template contains test and eslint configurations and Redux boilerplate code, required for rapid start of your fabulous project.

## Available Scripts

In the project directory, you can run:

- `yarn start`. Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

- `yarn test`. Launches the test runner in the interactive watch mode.

- `yarn build`. Builds the app for production to the `build` folder.

- `yarn eject`. Exposes content of `react-script` package

- `yarn lint`. Lints project files according to eslint rules, see below. Typical use case: continuous integration environments, Travis, CircleCI, etc.

- `yarn fix`. Same as `yarn lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all confifguration is done by adding config files where possible. Also no `devDependencies` for now, sorry.

## Redux configuration

Template provides basic Redux configuration with [feature based](https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks) folder structure. You can use [Redux devtools browser extension](http://extension.remotedev.io/). Sample feature included in `src/features` folder, note technology agnostic `features` folder name. Based on Redux maintainers recommendation.

## Git hooks

Git hooks management provided by [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged). In order to keep your repo clean, every time you commit something `husky` will run `eslint --fix` command  on staged files, preventing you from committing badly formatted code. Before each push tests will run in the same manner. You can change or disable this behavior in `.linstagedrc` and `.huskyrc` config files.
Please note you need to [update snapshots](https://jestjs.io/docs/en/snapshot-testing#updating-snapshots) and fix failing tests to be able to commit or push your code.

## Testing

Snapshot testing done with [enzyme](https://airbnb.io/enzyme/). Sample tests are included. Redux connected components are tested with [redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store).

## Eslint configuration
Template extends CRA eslint rules with custom set, tailored for reasonable and clean development process. I added `prettier` to force consistent formatting and `eslint-plugin-fp` to avoid accidental mutations. Don't like trailing semicolons? Feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside `.prettierrc` file to match your code style.

Eslint rules are commented for your convenience feel free to tweak or remove them. No judgement.

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
    // Proptypes, defaultProps and common.js (module.exports = {}) are ok.
    "fp/no-mutation": [
      "warn",
      {
        "commonjs": true,
        "allowThis": true,
        "exceptions": [{"property": "propTypes"}, {"property": "defaultProps"}]
      }
    ]
```

## Absolute imports

You can use source folder relative paths for imports. `import Component from './../../../../../../src/components/Component'` becomes `import Component from 'components/Component'`. Configuration is inside `jsconfig.json` file. You will love it 💖!


