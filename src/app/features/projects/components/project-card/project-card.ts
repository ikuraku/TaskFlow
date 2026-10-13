import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, PercentPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Project } from '../../models/project.model';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe,
    HighlightDirective,
  ],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  @Input({ required: true }) project!: Project;
  @Output() selected = new EventEmitter<Project>();

  onSelect(): void {
    this.selected.emit(this.project);
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
