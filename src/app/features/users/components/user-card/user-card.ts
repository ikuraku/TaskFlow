import { Component, Input } from '@angular/core';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { UserProjectGroup } from '../user-project-group/user-project-group';

export interface ProjectTasksGroup {
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [TitleCasePipe, LowerCasePipe, InitialsPipe, HighlightDirective, UserProjectGroup],
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input({ required: true }) user!: User;
  @Input() projects: Project[] = [];

  get groups(): ProjectTasksGroup[] {
    return this.projects
      .map(project => ({
        projectName: project.name,
        tasks: project.tasks.filter(task => task.assigneeId === this.user.id),
      }))
      .filter(group => group.tasks.length > 0);
  }

  private get allTasks(): Task[] {
    return this.groups.flatMap(group => group.tasks);
  }

  get totalTasks(): number {
    return this.allTasks.length;
  }

  get todoCount(): number {
    return this.allTasks.filter(t => t.status === 'En attente').length;
  }

  get inProgressCount(): number {
    return this.allTasks.filter(t => t.status === 'En cours').length;
  }

  get doneCount(): number {
    return this.allTasks.filter(t => t.status === 'Terminé').length;
  }
}
