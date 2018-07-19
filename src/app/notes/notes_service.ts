/**
 * Maintains state about notes.
 */

import {Injectable} from '@angular/core';

export class Note {
  x: number;
  y: number;
  content: string;

  constructor(params: Note) {
    Object.assign(this, params);
  }
}

export interface Point {
  x: number;
  y: number;
}

@Injectable()
export class NotesService {
  private readonly notes: Note[] = [];
  private draggedNote: Note|null;
  private dragPromise: Promise<Point>;
  private dragPromiseResolve;
  private dragPromiseReject;
  private dragStartX: number;
  private dragStartY: number;

  getDraggedNote() {
    return this.draggedNote;
  }

  getGlobalNotesList() {
    return this.notes;
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  removeNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  beginDrag(note: Note, x: number, y: number): Promise<Point> {
    if (this.dragPromise) {
      this.dragPromiseReject();
    }
    this.draggedNote = note;
    this.dragPromise = new Promise<Point>((resolve, reject) => {
      this.dragPromiseResolve = resolve;
      this.dragPromiseReject = reject;
    });
    this.dragStartX = x;
    this.dragStartY = y;
    return this.dragPromise;
  }

  endDrag(x: number, y: number) {
    this.draggedNote = null;
    if (this.dragPromise) {
      const diffX = x - this.dragStartX;
      const diffY = y - this.dragStartY;
      this.dragPromiseResolve({
        x: diffX,
        y: diffY,
      });
    }
  }

  cancelDrag() {
    if (this.dragPromise) {
      this.dragPromiseReject();
    }
  }
}
