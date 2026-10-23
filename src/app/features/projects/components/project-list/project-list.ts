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

  projects = signal<Project[]>([]);
  users = signal<User[]>([]);
  searchTerm = signal('');
  selectedProjectId = signal<number | null>(null);

  // Projets filtrés par la recherche (nom ou description)
  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.projects();
    return this.projects().filter(
      p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  });

  // Le détail n'est affiché que si le projet sélectionné fait partie des projets filtrés
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

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  selectProject(project: Project): void {
    this.selectedProjectId.update(id => (id === project.id ? null : project.id));
  }

  closeDetail(): void {
    this.selectedProjectId.set(null);
  }

  // Mise à jour immuable (partie 4)
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
  }

  onDetailStatusChange(change: TaskStatusChange): void {
    const projectId = this.selectedProjectId();
    if (projectId === null) return;
    this.onTaskStatusChange({ projectId, ...change });
  }
}
