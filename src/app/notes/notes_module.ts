/**
 * Feature module for a view in the app.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared_module';

import { Canvas } from './canvas';
import { NoteComponent } from './note';
import { GhostNoteComponent } from './ghost_note';
import { NotesService } from './notes_service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    Canvas,
    GhostNoteComponent,
    NoteComponent,
  ],
  providers: [
    NotesService,
  ],
  exports: [
    CommonModule,
    Canvas,
    GhostNoteComponent,
    NoteComponent,
  ],
})
export class NotesModule {
}
