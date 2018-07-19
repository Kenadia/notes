/**
 * A single note on the canvas.
 */

import {Component, Input} from '@angular/core';

import {Note} from './notes_service';

const TEMPLATE = `
<div
  class="note ghost-note"
  [style.left.px]="note.x"
  [style.top.px]="note.y">
  <span class="note-content">
    {{ note.content }}
  </span>
</div>
`;

@Component({
  selector: 'n-ghost-note',
  template: TEMPLATE,
  styleUrls: ['./note.scss'],
})
export class GhostNoteComponent {
  @Input() note: Note;
}
