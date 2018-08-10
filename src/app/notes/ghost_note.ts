/**
 * A single note on the canvas.
 */

import {Component, Input} from '@angular/core';

import {Note} from './notes_service';

@Component({
  selector: 'n-ghost-note',
  templateUrl: './ghost_note.ng.html',
  styleUrls: ['./note.scss'],
})
export class GhostNoteComponent {
  @Input() note: Note;
}
