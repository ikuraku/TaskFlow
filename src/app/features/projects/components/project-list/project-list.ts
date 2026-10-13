import { Component, OnInit, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { User } from '../../../users/models/user.model';
import { ProjectCard } from '../project-card/project-card';
import { TaskList } from '../task-list/task-list';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCard, TaskList],
  templateUrl: './project-list.html'
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);

  projects: Project[] = [];
  users: User[] = [];
  selectedProject?: Project;

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => (this.projects = projects));
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  get totalTasks(): number {
    return this.projects.reduce((sum, p) => sum + p.tasks.length, 0);
  }

  get doneTasks(): number {
    return this.projects.reduce(
      (sum, p) => sum + p.tasks.filter(t => t.status === 'Terminé').length,
      0
    );
  }

  selectProject(project: Project): void {
    this.selectedProject = this.selectedProject?.id === project.id ? undefined : project;
  }

  closeDetail(): void {
    this.selectedProject = undefined;
  }
}
