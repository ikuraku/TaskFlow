import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') text = '';

  private tooltip: HTMLElement | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  show(): void {
    if (!this.text || this.tooltip) return;

    const host = this.el.nativeElement;
    this.renderer.setStyle(host, 'position', 'relative');

    const bubble = this.renderer.createElement('span');
    this.renderer.appendChild(bubble, this.renderer.createText(this.text));

    const classes = [
      'absolute', 'left-0', 'top-full', 'z-10', 'mt-1', 'w-64',
      'rounded', 'bg-gray-800', 'px-2', 'py-1', 'text-xs', 'text-white', 'shadow-lg',
    ];
    classes.forEach(c => this.renderer.addClass(bubble, c));

    this.renderer.appendChild(host, bubble);
    this.tooltip = bubble;
  }

  @HostListener('mouseleave')
  hide(): void {
    if (!this.tooltip) return;
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    this.tooltip = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
