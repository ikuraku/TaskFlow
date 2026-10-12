import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TruncatePipe, DeadlinePipe],
  templateUrl: './task-list.html',
})
export class TaskList {
  @Input({ required: true }) tasks: Task[] = [];
  @Input() users: User[] = [];
  @Input() showAssignee = true;

  getAssigneeName(assigneeId?: number): string {
    if (assigneeId === undefined) return 'Non assignée';
    return this.users.find(u => u.id === assigneeId)?.name ?? 'Non assignée';
  }
}
