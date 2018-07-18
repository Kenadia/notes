import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnInit {
  @Input('tooltip') content: string;
  private tooltipElement: HTMLDivElement;

  constructor(private ref: ElementRef) {
  }

  ngOnInit() {
    if (this.content.trim().length) {
      this.tooltipElement = document.createElement('div');
      this.tooltipElement.innerHTML = this.content;
      this.tooltipElement.classList.add('ng-tooltip');
      const element = this.ref.nativeElement;
      element.insertBefore(this.tooltipElement, element.firstChild);
      element.classList.add('ng-tooltip-host');
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.content.trim().length) {
      this.tooltipElement.classList.add('ng-tooltip-visible');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.content.trim().length) {
      this.tooltipElement.classList.remove('ng-tooltip-visible');
    }
  }
}
