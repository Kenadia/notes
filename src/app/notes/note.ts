/**
 * A single note on the canvas.
 */

import {Component, Input} from '@angular/core';

import {Note, NotesService} from './notes_service';

@Component({
  selector: 'n-note',
  templateUrl: './note.ng.html',
  styleUrls: ['./note.scss'],
})
export class NoteComponent {
  @Input() note: Note;
  isDragging: boolean = false;
  isEditing: boolean = true;

  constructor(private notesService: NotesService) {
  }

  beginDrag(event) {
    this.isDragging = true;
    const promise = this.notesService.beginDrag(this.note, event.x, event.y) as any;
    promise
      .then((diff) => {
        this.note.x += diff.x;
        this.note.y += diff.y;
      })
      .finally(() => {
        this.isDragging = false;
      });
  }

  endDrag() {
    this.notesService.cancelDrag();
  }

  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
    if (this.note.content.trim() === '') {
      this.notesService.removeNote(this.note);
    }
  }
}
