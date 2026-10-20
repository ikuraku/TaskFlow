import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    DatePipe, TruncatePipe, DeadlinePipe,
    HighlightDirective, OverdueDirective, TooltipDirective,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  // Entrée obligatoire : la tâche à afficher
  task = input.required<Task>();

  // Entrées optionnelles, transmises par TaskList
  showAssignee = input(true);
  assigneeName = input<string | null>(null);
}
