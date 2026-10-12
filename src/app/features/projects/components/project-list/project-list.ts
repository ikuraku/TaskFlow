import { Component, OnInit, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCard],
  templateUrl: './project-list.html'
})
export class ProjectList implements OnInit {
  private projectService = inject(ProjectService);

  projects: Project[] = [];
  selectedProject?: Project;

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    console.log(project);
  }
}
