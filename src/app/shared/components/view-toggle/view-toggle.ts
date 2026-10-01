import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [],
  templateUrl: './view-toggle.html'
})
export class ViewToggle {

  @Output() viewChange =
    new EventEmitter<'task' | 'user'>();

  currentView: 'task' | 'user' = 'task';

  setView(view: 'task' | 'user'): void {

    this.currentView = view;

    this.viewChange.emit(view);
  }
}
