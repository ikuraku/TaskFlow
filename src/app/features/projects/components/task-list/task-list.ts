import { Component, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  users = input<User[]>([]);
  showAssignee = input(true);

  getAssigneeName(assigneeId?: number): string {
    if (assigneeId === undefined) return 'Non assignée';
    return this.users().find(u => u.id === assigneeId)?.name ?? 'Non assignée';
  }
}
