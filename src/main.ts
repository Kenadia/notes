/**
 * Entry point for the Javascript bundle.
 *
 * Bootstraps the app using the root module definition in app_module.ts.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app_module';

if (process.env.ENV === 'build') {
  enableProdMode();
}

function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
