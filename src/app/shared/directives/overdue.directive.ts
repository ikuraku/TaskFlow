import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
  standalone: true,
})
export class OverdueDirective {
  @Input() dueDate?: string | null;
  @Input() done = false;

  @HostBinding('class')
  get overdueClasses(): string {
    if (this.done || !this.dueDate) return '';

    const [y, m, d] = this.dueDate.split('-').map(Number);
    const due = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return due < today ? 'border-red-500 bg-red-50' : '';
  }
}
