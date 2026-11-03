import { Component, inject } from '@angular/core';

import { ViewToggle }
  from './shared/components/view-toggle/view-toggle';

import { ProjectList }
  from './features/projects/components/project-list/project-list';

import { UserList }
  from './features/users/components/user-list/user-list';

import { FavoritesService }
  from './core/services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ViewToggle,
    ProjectList,
    UserList
  ],
  templateUrl: './app.html'
})
export class App {

  // Partie 3 : le même service que ProjectCard (singleton)
  favorites = inject(FavoritesService);

  currentView: 'task' | 'user' = 'task';

  changeView(view: 'task' | 'user'): void {
    this.currentView = view;
  }
}
