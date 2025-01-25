import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  bienvenida = 'Bienvenido a la aplicación de tareas';
  tareas = [
    'Instalar en angular en CLI',
    'Crear proyecto',
    'Crear componentes',
  ]
  
}