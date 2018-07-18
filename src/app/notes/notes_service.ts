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
  private dragPromise: Promise<Point>;
  private dragPromiseResolve;
  private dragPromiseReject;
  private dragStartX: number;
  private dragStartY: number;

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

  beginDrag(x: number, y: number): Promise<Point> {
    if (this.dragPromise) {
      this.dragPromiseReject();
    }
    this.dragPromise = new Promise<Point>((resolve, reject) => {
      this.dragPromiseResolve = resolve;
      this.dragPromiseReject = reject;
    });
    this.dragStartX = x;
    this.dragStartY = y;
    return this.dragPromise;
  }

  endDrag(x: number, y: number) {
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
