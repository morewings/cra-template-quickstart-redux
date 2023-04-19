[![Build Status](https://github.com/morewings/cra-template-quickstart-redux/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/morewings/cra-template-quickstart-redux/actions/workflows/merge-jobs.yml)
[![npm version](https://badge.fury.io/js/cra-template-quickstart-redux.svg)](https://www.npmjs.com/package/cra-template-quickstart-redux)
[![npm](https://img.shields.io/npm/dm/cra-template-quickstart-redux)](http://npm-stats.org/#/cra-template-quickstart-redux)

# Quickstart Redux Create React App template

Opinionated quickstart [Create React App](https://github.com/facebook/create-react-app) (CRA) template.

## Features

* [Redux](https://redux.js.org/) for state management
* Custom [middleware](https://github.com/morewings/cra-template-quickstart-redux/tree/master/src/middlewares) and [store enhancer](https://github.com/morewings/cra-template-quickstart-redux/tree/master/src/enhancers) examples
* [Feature architecture](https://github.com/morewings/cra-template-quickstart-redux/wiki/Feature-architecture)
* Example tests for everything done with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Eslint](https://eslint.org/) and [stylelint](https://stylelint.io/)
* [Husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged) to observe code quality
* [CSS-modules](https://github.com/css-modules/css-modules) support

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

See [full documentation](https://github.com/morewings/cra-template-quickstart-redux/wiki) or [demo](https://morewings.github.io/cra-template-quickstart-redux/)
