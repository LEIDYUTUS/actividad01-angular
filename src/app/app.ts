import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonaComponent } from './components/persona-componente/persona-componente';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PersonaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('actividad01');
}