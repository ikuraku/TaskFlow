import { Component, OnInit, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectTaskStatusChange, TaskStatusChange } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { ProjectCard } from '../project-card/project-card';
import { TaskList } from '../task-list/task-list';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCard, TaskList],
  templateUrl: './project-list.html',
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

  selectProject(project: Project): void {
    this.selectedProject = this.selectedProject?.id === project.id ? undefined : project;
  }

  closeDetail(): void {
    this.selectedProject = undefined;
  }

  // Reçoit { projectId, taskId, status } et remplace le projet et la tâche concernés
  onTaskStatusChange(change: ProjectTaskStatusChange): void {
    this.projects = this.projects.map(project =>
      project.id !== change.projectId
        ? project
        : {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === change.taskId ? { ...task, status: change.status } : task
          ),
        }
    );

    // Le panneau de détail doit pointer vers le nouveau projet, pas l'ancien
    if (this.selectedProject) {
      this.selectedProject = this.projects.find(p => p.id === this.selectedProject!.id);
    }
  }

  // Changement venu du panneau de détail : le projet concerné est le projet sélectionné
  onDetailStatusChange(change: TaskStatusChange): void {
    if (!this.selectedProject) return;
    this.onTaskStatusChange({ projectId: this.selectedProject.id, ...change });
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
}
