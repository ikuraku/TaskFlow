import { Component, Input } from '@angular/core';

import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';

import { TaskList } from '../../../projects/components/task-list/task-list';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [TaskList],
  templateUrl: './user-project-group.html'
})
export class UserProjectGroup {

  @Input() project!: Project;

  @Input() tasks: Task[] = [];
}
