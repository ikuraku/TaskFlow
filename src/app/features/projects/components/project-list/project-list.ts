import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Project } from '../../models/project.model';
import {
  ProjectTaskDelete, ProjectTaskStatusChange, TaskFilter, TaskStatusChange,
} from '../../models/task.model';
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

  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  searchTerm = signal('');
  selectedProjectId = signal<number | null>(null);

  statusFilter = signal<TaskFilter>('Toutes');
  readonly filterOptions: { value: TaskFilter; label: string }[] = [
    { value: 'Toutes', label: 'Toutes' },
    { value: 'En cours', label: 'En cours' },
    { value: 'Terminé', label: 'Terminées' },
  ];

  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.projects();
    return this.projects().filter(
      p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  });

  selectedProject = computed(
    () => this.filteredProjects().find(p => p.id === this.selectedProjectId()) ?? null
  );

  totalTasks = computed(() =>
    this.filteredProjects().reduce((sum, p) => sum + p.tasks.length, 0)
  );

  doneTasks = computed(() =>
    this.filteredProjects().reduce(
      (sum, p) => sum + p.tasks.filter(t => t.status === 'Terminé').length,
      0
    )
  );

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  // Sauvegarde l'état actuel dans le navigateur
  private persist(): void {
    this.projectService.saveProjects(this.projects());
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  setFilter(filter: TaskFilter): void {
    this.statusFilter.set(filter);
  }

  selectProject(project: Project): void {
    this.selectedProjectId.update(id => (id === project.id ? null : project.id));
  }

  closeDetail(): void {
    this.selectedProjectId.set(null);
  }

  onTaskStatusChange(change: ProjectTaskStatusChange): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== change.projectId
          ? project
          : {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === change.taskId ? { ...task, status: change.status } : task
            ),
          }
      )
    );
    this.persist();
  }

  onDetailStatusChange(change: TaskStatusChange): void {
    const projectId = this.selectedProjectId();
    if (projectId === null) return;
    this.onTaskStatusChange({ projectId, ...change });
  }

  onTaskDelete(change: ProjectTaskDelete): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== change.projectId
          ? project
          : { ...project, tasks: project.tasks.filter(task => task.id !== change.taskId) }
      )
    );
    this.persist();
  }

  onDetailDelete(taskId: number): void {
    const projectId = this.selectedProjectId();
    if (projectId === null) return;
    this.onTaskDelete({ projectId, taskId });
  }

  // Remet les données d'origine (efface la sauvegarde)
  resetData(): void {
    this.projectService.resetProjects().subscribe(projects => {
      this.projects.set(projects);
      this.selectedProjectId.set(null);
    });
  }
}
