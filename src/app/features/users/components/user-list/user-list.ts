import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';

import { UserService } from '../../../../core/services/user.service';
import { ProjectService } from '../../../../core/services/project.service';

import { UserCard } from '../user-card/user-card';

import { EmptyState }
  from '../../../../shared/components/empty-state/empty-state';
import { AutofocusDirective } from '../../../../shared/directives/autofocus.directive';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    FormsModule,
    UserCard,
    EmptyState ,
    AutofocusDirective
  ],
  templateUrl: './user-list.html'
})
export class UserList implements OnInit {

  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  users: User[] = [];
  projects: Project[] = [];

  searchTerm = '';

  ngOnInit(): void {

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });

  }

  get filteredUsers(): User[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();

    if (!search) {
      return this.users;
    }

    return this.users.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  }
}
