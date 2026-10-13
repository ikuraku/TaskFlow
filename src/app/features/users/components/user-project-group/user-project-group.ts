import { Component, Input } from '@angular/core';
import { Task } from '../../../projects/models/task.model';
import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [TaskList],
  templateUrl: './user-project-group.html',
})
export class UserProjectGroup {
  @Input({ required: true }) projectName!: string;
  @Input({ required: true }) tasks: Task[] = [];
}
