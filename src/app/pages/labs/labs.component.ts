import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports : [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = "Todoapp";
  bienvenida = 'Bienvenido a la aplicación de tareas';
  tareas = [
    'Instalar en angular en CLI',
    'Crear proyecto',
    'Crear componentes',
  ]
  name = 'Raymundo';
  //Agregamos una propiedad de edad
  //Si es publica se puede acceder desde el HTML o template
  //Si es privada solo se puede acceder desde el componente
  age = 26;
}
