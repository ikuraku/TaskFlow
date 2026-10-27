import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';
import { PROJECTS } from '../../features/projects/data/projects.data';

const STORAGE_KEY = 'taskflow.projects';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  // Données sauvegardées si elles existent, sinon données d'origine
  getProjects(): Observable<Project[]> {
    return of(this.load() ?? PROJECTS);
  }

  // Appelé après chaque modification (statut, suppression)
  saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // stockage indisponible ou plein : l'application continue sans sauvegarde
    }
  }

  // Efface la sauvegarde et redonne les données d'origine
  resetProjects(): Observable<Project[]> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignoré
    }
    return of(PROJECTS);
  }

  private load(): Project[] | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return Array.isArray(data) ? (data as Project[]) : null;
    } catch {
      return null;
    }
  }
}
