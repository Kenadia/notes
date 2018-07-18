import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[trigger-focus]',
})
export class FocusDirective implements OnChanges {
  @Input('trigger-focus') focusOn: boolean;

  constructor(private ref: ElementRef) {}

  ngOnChanges() {
    if (this.focusOn) {
      this.ref.nativeElement.focus();
    }
  }
}
