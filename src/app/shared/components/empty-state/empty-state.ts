import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.html'
})
export class EmptyState {

  @Input() title = 'Aucun résultat';

  @Input() message = '';
}
