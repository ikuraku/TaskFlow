import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';
import { Task } from '../../features/projects/models/task.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  readonly id = Math.random().toString(36).slice(2, 8);

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/projects';

  constructor() {
    console.log('ProjectService créé, id =', this.id);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Enregistre la nouvelle liste de tâches d'un projet (statut modifié, tâche supprimée)
  updateTasks(projectId: number, tasks: Task[]): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${projectId}`, { tasks });
  }
}
