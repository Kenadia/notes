/**
 * Utilities shared by the other modules.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusDirective } from './focus_directive';
import { TooltipDirective } from './tooltip_directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    // Add components, pipes, and directives here.
    FocusDirective,
    TooltipDirective,
  ],
  providers: [
    // Add services here.
  ],
  exports: [
    CommonModule,

    // Add exported components, pipes, and directives here.
    FocusDirective,
    TooltipDirective,
  ],
})
export class SharedModule {
}
