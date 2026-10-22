import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) project!: Project;
  @Input() users: User[] = [];

  @Output() selected = new EventEmitter<Project>();
  @Output() taskStatusChange = new EventEmitter<ProjectTaskStatusChange>();

  onSelect(): void {
    this.selected.emit(this.project);
  }

  // On n'écrit rien dans this.project : on ajoute projectId et on remonte
  onTaskStatusChange(change: TaskStatusChange): void {
    this.taskStatusChange.emit({ projectId: this.project.id, ...change });
  }

  get completionRate(): number {
    const total = this.project.tasks.length;
    if (total === 0) return 0;
    return this.project.tasks.filter(t => t.status === 'Terminé').length / total;
  }

  get averageCost(): number {
    const total = this.project.tasks.length;
    return total === 0 ? 0 : this.project.budget / total;
  }

  get tasksByPriority(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const task of this.project.tasks) {
      counts[task.priority] = (counts[task.priority] ?? 0) + 1;
    }
    return counts;
  }
}
