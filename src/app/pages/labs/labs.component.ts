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
  disabled = true;
  img = 'https://www.google.com.mx/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

  person = {
    name: 'Raymundo',
    age: 26,
    img: 'https://www.google.com.mx/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
  }

  //Ejemplo de funcion con alerta
  clickHandler() {
    alert('Le picaste vato');
  } 
  
  //Ejemplo de funcion para deteccion de cambios en input
  changeHandler(event: Event) {
    console.log(event);
  }

  //Ejemplo de funcion para deteccion de evento keydown
  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

}
