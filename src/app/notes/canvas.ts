/**
 * A canvas on which notes can be created.
 */

import {Component, Input} from '@angular/core';

import {Note, NotesService} from './notes_service';

const TEMPLATE = `
<div
  class="canvas"
  (click)="addNote($event)"
  (mouseup)="endDrag($event)">

  <n-note *ngFor="let note of notes" [note]="note"></n-note>

</div>
`;

@Component({
  selector: 'n-canvas',
  template: TEMPLATE,
  styleUrls: ['./canvas.scss'],
})
export class Canvas {
  @Input() content: string;
  notes: Note[];

  constructor(private notesService: NotesService) {
    this.notes = notesService.getGlobalNotesList();
  }

  addNote(event) {
    const newNote = new Note({
      x: event.x,
      y: event.y,
      content: '',
    });
    this.notesService.addNote(newNote);
  }

  endDrag(event) {
    this.notesService.endDrag(event.x, event.y);
  }
}
