import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'taskflow.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // Identifiants des projets favoris
  private ids = signal<number[]>(this.load());

  // Nombre de favoris : se lit avec count() dans les templates
  readonly count = computed(() => this.ids().length);

  isFavorite(projectId: number): boolean {
    return this.ids().includes(projectId);
  }

  // Ajoute le projet s'il n'est pas favori, le retire sinon (mise à jour immuable)
  toggle(projectId: number): void {
    this.ids.update(ids =>
      ids.includes(projectId) ? ids.filter(id => id !== projectId) : [...ids, projectId]
    );
    this.save();
  }

  // Les favoris survivent au rafraîchissement de la page
  private load(): number[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
    } catch {
      // stockage indisponible : les favoris restent en mémoire
    }
  }
}
