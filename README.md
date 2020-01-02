[![Build Status](https://travis-ci.org/morewings/cra-template-quickstart-redux.svg?branch=master)](https://travis-ci.org/morewings/cra-template-quickstart-redux)
[![dependencies Status](https://david-dm.org/morewings/cra-template-quickstart-redux/status.svg)](https://david-dm.org/morewings/cra-template-quickstart-redux)
[![npm version](https://badge.fury.io/js/cra-template-quickstart-redux.svg)](https://badge.fury.io/js/cra-template-quickstart-redux)

# Custom Create React App template

Opinionated quickstart Create React App template with Redux, enzyme and custom eslint configuration.

## Usage

``npx create-react-app %PROJECT_NAME% --template quickstart-redux``

## Motivation

I use Create React App pretty much often. But I hate to write same boilerplate code again and again. This template contains test and eslint configurations and boilerplate code required for rapid start of your fabulous project.

## What's inside?

1. Template extends Create React App eslint rules with custom set, tailored for reasonable and clean development process. 
2. Basic Redux configuration with [feature based](https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks) folder structure. You can use [Redux devtools browser extension](http://extension.remotedev.io/). Sample reducer included.
3. Git hooks management provided by `husky` and `lint-staged`. Keep your repo clean.
4. Snapshot testing available with `enzyme`. Sample tests are included.
5. Example basic folder structure, to keep your project organised.
6. You can use source folder relative paths for imports. `import Component from './../../../../../../src/components/Component'` becomes `import Component from 'components/Component'`. You will love it 💖!
7. All features of the most recent Create React App.