import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todoapp';
  bienvenida = 'Bienvenido a la aplicación de tareas';
  lista = [
      'Estudiar Angular',
      'Hacer la compra',
      'Pasear al perro'
  ]
}
