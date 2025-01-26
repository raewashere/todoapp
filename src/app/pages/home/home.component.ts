import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear  servicio',
  ]);

  //Agregar una nueva tarea
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    if(newTask){
      //Agregar nuevo elemento al arreglo sin mutar el arreglo original
      this.tasks.update((tasks) => [ ...tasks, newTask]);
      input.value = '';
    }
  }

  //Eliminar una tarea de acuerdo a su indice
  deleteTask(index: number){
    //Actualiza el estado de las tareas con una funcion arrow para no mostrar la tarea eliminada
    this.tasks.update((tasks) => tasks.filter((task, i) => i !== index));
  }
}