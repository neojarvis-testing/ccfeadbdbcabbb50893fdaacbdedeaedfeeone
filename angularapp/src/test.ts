// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Ensure Webpack context is recognized
declare const require: {
  context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => any;
};

async function importAllTests() {
  const testContext = require.context('./', true, /\.spec\.ts$/);
  return Promise.all(testContext.keys().map(testContext));
}

// Load all test files
importAllTests().then(() => {
  console.log('All test files loaded.');
});

