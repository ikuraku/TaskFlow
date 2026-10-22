import { Component, computed, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { StatusIconPipe } from '../../../../shared/pipes/status-icon.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

// Cycle : En attente → En cours → Terminé → En attente
const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  'En attente': 'En cours',
  'En cours': 'Terminé',
  'Terminé': 'En attente',
};

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe, TruncatePipe, DeadlinePipe, StatusIconPipe,
    HighlightDirective, OverdueDirective, TooltipDirective,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input(true);
  assigneeName = input<string | null>(null);
  editable = input(true);

  // Événement envoyé au parent, avec le NOUVEAU statut
  taskStatusChange = output<TaskStatus>();

  changeStatus(event: Event): void {
    event.stopPropagation(); // évite de sélectionner la carte projet derrière le bouton
    const next = NEXT_STATUS[this.task().status];
    this.taskStatusChange.emit(next);
  }
}
