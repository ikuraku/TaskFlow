import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, PercentPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectTaskStatusChange, TaskStatusChange } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe,
    HighlightDirective, TaskList,
  ],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  users = input<User[]>([]);

  selected = output<Project>();
  taskStatusChange = output<ProjectTaskStatusChange>();

  // 4.3 : nombre de tâches terminées de CE projet
  doneCount = computed(() => this.project().tasks.filter(t => t.status === 'Terminé').length);

  // 4.4 : avancement entre 0 et 1, calculé à partir de doneCount()
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

  onSelect(): void {
    this.selected.emit(this.project());
  }

  onTaskStatusChange(change: TaskStatusChange): void {
    this.taskStatusChange.emit({ projectId: this.project().id, ...change });
  }
}
