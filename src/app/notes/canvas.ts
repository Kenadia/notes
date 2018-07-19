/**
 * A canvas on which notes can be created.
 */

import {Component, Input} from '@angular/core';

import {Note, NotesService} from './notes_service';

const TEMPLATE = `
<div
  class="canvas"
  (click)="addNote($event)"
  (mousedown)="startDrag()"
  (mouseup)="endDrag($event)"
  (mousemove)="moveGhost($event)">

  <n-note *ngFor="let note of notes" [note]="note"></n-note>
  <n-ghost-note *ngIf="isDragging" [note]="ghostNote"></n-ghost-note>

</div>
`;

@Component({
  selector: 'n-canvas',
  template: TEMPLATE,
  styleUrls: ['./canvas.scss'],
})
export class Canvas {
  @Input() content: string;
  ghostNote: Note|null = null;
  isDragging: boolean = false;
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

  startDrag() {
    const draggedNote = this.notesService.getDraggedNote();
    // Make a copy to be used by the ghost.
    if (draggedNote) {
      this.ghostNote = new Note(draggedNote);
      this.isDragging = true;
    }
  }

  endDrag(event) {
    this.isDragging = false;
    this.ghostNote = null;
    this.notesService.endDrag(event.x, event.y);
  }

  moveGhost(event) {
    if (this.isDragging) {
      this.ghostNote.x += event.movementX;
      this.ghostNote.y += event.movementY;
    }
  }
}
