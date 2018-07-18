/**
 * Classes used exactly one time and only by the root module.
 */

import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    // Add components, pipes, and directives here.
  ],
  providers: [
    // Add services here.
  ],
  exports: [
    CommonModule,
    // Add exported components, pipes, and directives here.
  ],
})
export class CoreModule {
  // Prevent re-import of the CoreModule.
  // https://angular.io/docs/ts/latest/guide/ngmodule.html#prevent-reimport
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
          'CoreModule is already loaded. Import it in the root module only');
    }
  }
}
