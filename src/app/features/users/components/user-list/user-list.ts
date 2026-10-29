import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserCard } from '../user-card/user-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCard, EmptyState, AutofocusDirective],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private projectService = inject(ProjectService);
  private userService = inject(UserService);

  users: User[] = [];
  projects: Project[] = [];
  searchTerm = '';

  ngOnInit(): void {
    // Partie 1.3 : comparer cet id avec celui affiché par ProjectList
    console.log('UserList utilise ProjectService id =', this.projectService.id);
    console.log('UserList utilise UserService id =', this.userService.id);

    this.userService.getUsers().subscribe(users => (this.users = users));
    this.projectService.getProjects().subscribe(projects => (this.projects = projects));
  }

  get filteredUsers(): User[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.users;
    return this.users.filter(
      u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
    );
  }
}
