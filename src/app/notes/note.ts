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

  preventContextMenu() {
    return false;
  }

  mouseDown(event) {
    if (event.button === 0) {
      this.beginDrag(event);
    } else if (event.button === 2) {
      this.startLine();
    }
  }

  mouseUp(event) {
    if (event.button === 0) {
      this.endDrag();
    } else if (event.button === 2) {
      this.endLine();
    }
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

  stopEditing(textarea) {
    this.resizeTextarea(textarea);
    this.isEditing = false;
    if (this.note.content.trim() === '') {
      this.notesService.removeNote(this.note);
    }
  }

  delete() {
    this.notesService.removeNote(this.note);
  }

  startLine() {
    this.notesService.selectFirstNote(this.note);
  }

  endLine() {
  }

  resizeTextarea(element: HTMLTextAreaElement) {
    this.note.width = element.offsetWidth;
    this.note.height = element.offsetHeight;
  }
}
