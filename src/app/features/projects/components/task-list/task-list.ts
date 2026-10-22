import { Component, computed, input, output } from '@angular/core';
import { Task, TaskStatus, TaskStatusChange } from '../../models/task.model';
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
  editable = input(true);

  // Remonte : identifiant de la tâche + nouveau statut
  taskStatusChange = output<TaskStatusChange>();

  private userNames = computed(() => new Map(this.users().map(u => [u.id, u.name])));

  getAssigneeName(assigneeId?: number): string {
    if (assigneeId === undefined) return 'Non assignée';
    return this.userNames().get(assigneeId) ?? 'Non assignée';
  }

  onStatusChange(taskId: number, status: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, status });
  }
}
