// Thanks to https://www.namekdev.net/2016/01/two-way-binding-to-contenteditable-element-in-angular-2/

import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output, ɵlooseIdentical} from '@angular/core';

export function isPropertyUpdated(changes: {[key: string]: any}, viewModel: any): boolean {
  if (!changes.hasOwnProperty('model')) return false;
  const change = changes['model'];

  if (change.isFirstChange()) return true;
  return !ɵlooseIdentical(viewModel, change.currentValue);
}

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class ContenteditableModelDirective implements OnChanges {
  @Input('contenteditableModel') model: any;
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;

  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes) {
    if (isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model
      this.refreshView()
    }
  }

  onBlur() {
    var value = this.elRef.nativeElement.innerText
    this.lastViewModel = value
    this.update.emit(value)
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model
  }
}
