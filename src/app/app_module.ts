/**
 * Root module, responsible for orchestrating the application.
 *
 * For more info about modules in Angular, see:
 * https://angular.io/docs/ts/latest/guide/ngmodule.html
 */

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';

import { CoreModule } from './core/core_module';
import { SharedModule } from './shared/shared_module';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,

    // Our modules
    CoreModule,
    SharedModule,
  ],
  declarations: [
    App,
  ],
  providers: [],
  bootstrap: [
    App,
  ],
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}

  hmrOnInit(store) {
    console.log('HMR store', store);
  }

  hmrOnDestroy(store) {
    let componentLocations =
        this.appRef.components.map(cmp => cmp.location.nativeElement);

    // Re-create elements.
    store.disposeOldHosts = createNewHosts(componentLocations);

    // Remove styles.
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // Display new elements.
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
