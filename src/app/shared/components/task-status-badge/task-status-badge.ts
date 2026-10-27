import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskStatus } from '../../../features/projects/models/task.model';

// Classes Tailwind du badge selon le statut
const BADGE_CLASSES: Record<TaskStatus, string> = {
  'Terminé': 'bg-green-100 text-green-700',
  'En cours': 'bg-blue-100 text-blue-700',
  'En attente': 'bg-gray-100 text-gray-700',
};

@Component({
  selector: 'app-task-status-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-status-badge.html',
})
export class TaskStatusBadge {
  // Entrée obligatoire : le statut à afficher
  status = input.required<TaskStatus>();

  // Classes calculées à partir du statut
  badgeClasses = computed(() => BADGE_CLASSES[this.status()]);
}
