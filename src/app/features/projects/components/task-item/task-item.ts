import { Component, computed, input, output } from '@angular/core';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { StatusIconPipe } from '../../../../shared/pipes/status-icon.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { TaskStatusBadge } from '../../../../shared/components/task-status-badge/task-status-badge';
const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  'En attente': 'En cours',
  'En cours': 'Terminé',
  'Terminé': 'En attente',
};

const PROGRESS: Record<TaskStatus, { width: number; color: string }> = {
  'En attente': { width: 0, color: '#9ca3af' },
  'En cours': { width: 50, color: '#3b82f6' },
  'Terminé': { width: 100, color: '#22c55e' },
};

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe, NgClass, NgStyle,
    TruncatePipe, DeadlinePipe, InitialsPipe, StatusIconPipe,
    HighlightDirective, OverdueDirective, TooltipDirective, TaskStatusBadge,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input(true);
  assigneeName = input<string | null>(null);
  editable = input(true);

  taskStatusChange = output<TaskStatus>();
  taskDelete = output<void>(); // suppression : aucune donnée, TaskList connaît l'identifiant

  progressStyle = computed(() => {
    const p = PROGRESS[this.task().status];
    return { 'width.%': p.width, 'background-color': p.color };
  });

  changeStatus(event: Event): void {
    event.stopPropagation();
    this.taskStatusChange.emit(NEXT_STATUS[this.task().status]);
  }

  deleteTask(event: Event): void {
    event.stopPropagation(); // évite de sélectionner la carte projet derrière le bouton
    this.taskDelete.emit();
  }
}
