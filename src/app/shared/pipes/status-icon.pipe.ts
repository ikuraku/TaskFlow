import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusIcon', standalone: true })
export class StatusIconPipe implements PipeTransform {
  transform(status: string | null | undefined): string {
    switch (status) {
      case 'Terminé':
        return '✅';
      case 'En cours':
        return '⏳';
      case 'En attente':
        return '🕒';
      default:
        return '❔';
    }
  }
}
