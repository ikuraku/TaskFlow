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

  taskStatusChange = output<TaskStatusChange>();

  // Table id → nom, construite à partir des utilisateurs reçus en entrée
  private userNames = computed(() => new Map(this.users().map(u => [u.id, u.name])));

  // null = tâche non assignée, nom = utilisateur trouvé, sinon identifiant inconnu
  getAssigneeName(assigneeId?: number): string | null {
    if (assigneeId === undefined) return null;
    return this.userNames().get(assigneeId) ?? 'Utilisateur inconnu';
  }

  onStatusChange(taskId: number, status: TaskStatus): void {
    this.taskStatusChange.emit({ taskId, status });
  }
}
