import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return 'Pas d’échéance';

    const [y, m, d] = value.split('-').map(Number);
    const due = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = Math.round((due.getTime() - today.getTime()) / 86_400_000);

    if (diff === 0) return 'Aujourd’hui';
    if (diff === 1) return 'Demain';
    if (diff > 1) return `Dans ${diff} jours`;

    const late = -diff;
    return `En retard de ${late} jour${late > 1 ? 's' : ''}`;
  }
}
