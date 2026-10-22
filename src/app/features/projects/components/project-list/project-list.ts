import { Component, OnInit, computed, inject, signal } from '@angular/core';
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

  // 4.1 : les projets vivent dans un signal
  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  selectedProjectId = signal<number | null>(null);

  // On mémorise l'identifiant, pas l'objet : le projet sélectionné
  // est retrouvé dans la liste à jour après chaque modification
  selectedProject = computed(
    () => this.projects().find(p => p.id === this.selectedProjectId()) ?? null
  );

  totalTasks = computed(() => this.projects().reduce((sum, p) => sum + p.tasks.length, 0));

  doneTasks = computed(() =>
    this.projects().reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'Terminé').length, 0)
  );

  ngOnInit(): void {
    // RxJS conservé : on s'abonne, puis on place le résultat dans le signal
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  selectProject(project: Project): void {
    this.selectedProjectId.update(id => (id === project.id ? null : project.id));
  }

  closeDetail(): void {
    this.selectedProjectId.set(null);
  }

  // 4.1 + 4.2 : update() avec une mise à jour immuable
  onTaskStatusChange(change: ProjectTaskStatusChange): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== change.projectId
          ? project // projet inchangé : même objet
          : {
            ...project, // nouveau projet
            tasks: project.tasks.map(task =>
              task.id === change.taskId
                ? { ...task, status: change.status } // nouvelle tâche
                : task
            ),
          }
      )
    );
  }

  // Changement venu du panneau de détail
  onDetailStatusChange(change: TaskStatusChange): void {
    const projectId = this.selectedProjectId();
    if (projectId === null) return;
    this.onTaskStatusChange({ projectId, ...change });
  }
}
