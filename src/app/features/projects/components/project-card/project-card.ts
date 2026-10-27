import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { Project } from '../../models/project.model';
import {
  ProjectTaskDelete, ProjectTaskStatusChange, TaskFilter, TaskStatusChange,
} from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, KeyValuePipe,
    HighlightDirective, TaskList,
  ],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  users = input<User[]>([]);
  statusFilter = input<TaskFilter>('Toutes');

  readonly previewLimit = 3;

  selected = output<Project>();
  taskStatusChange = output<ProjectTaskStatusChange>();
  taskDelete = output<ProjectTaskDelete>();

  doneCount = computed(() => this.project().tasks.filter(t => t.status === 'Terminé').length);

  completionRate = computed(() => {
    const total = this.project().tasks.length;
    return total === 0 ? 0 : this.doneCount() / total;
  });

  averageCost = computed(() => {
    const total = this.project().tasks.length;
    return total === 0 ? 0 : this.project().budget / total;
  });

  tasksByPriority = computed(() => {
    const counts: Record<string, number> = {};
    for (const task of this.project().tasks) {
      counts[task.priority] = (counts[task.priority] ?? 0) + 1;
    }
    return counts;
  });

  // Nombre de tâches qui passent le filtre (pour le « + n autre(s) »)
  filteredCount = computed(() => {
    const filter = this.statusFilter();
    return filter === 'Toutes'
      ? this.project().tasks.length
      : this.project().tasks.filter(t => t.status === filter).length;
  });

  onSelect(): void {
    this.selected.emit(this.project());
  }

  onTaskStatusChange(change: TaskStatusChange): void {
    this.taskStatusChange.emit({ projectId: this.project().id, ...change });
  }

  onTaskDelete(taskId: number): void {
    this.taskDelete.emit({ projectId: this.project().id, taskId });
  }
}
