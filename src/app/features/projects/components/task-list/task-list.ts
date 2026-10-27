import { Component, computed, input, output } from '@angular/core';
import { Task, TaskFilter, TaskStatus, TaskStatusChange } from '../../models/task.model';
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
  statusFilter = input<TaskFilter>('Toutes');
  limit = input<number | null>(null);

  taskStatusChange = output<TaskStatusChange>();
  taskDelete = output<number>(); // identifiant de la tâche à supprimer

  // Filtre d'abord, limite ensuite
  visibleTasks = computed(() => {
    const filter = this.statusFilter();
    const filtered =
      filter === 'Toutes' ? this.tasks() : this.tasks().filter(t => t.status === filter);
    const max = this.limit();
    return max === null ? filtered : filtered.slice(0, max);
  });

  private userNames = computed(() => new Map(this.users().map(u => [u.id, u.name])));

  getAssigneeName(assigneeId?: number): string | null {
    if (assigneeId === undefined) return null;
    return this.userNames().get(assigneeId) ?? 'Utilisateur inconnu';
  }

  onStatusChange(taskId: number, status: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, status });
  }

  onDelete(taskId: number): void {
    this.taskDelete.emit(taskId);
  }
}
