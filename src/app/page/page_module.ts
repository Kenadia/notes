/**
 * Feature module for a view in the app.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared_module';

import { Page } from './page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    Page,
  ],
  providers: [
  ],
  exports: [
    CommonModule,
    Page,
  ],
})
export class PageModule {
}
