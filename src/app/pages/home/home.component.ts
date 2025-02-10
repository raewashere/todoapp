import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

//Importar el modelo de tarea
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false,
    },
  ]);

  //Agregar una nueva tarea
  changeHandler() {
    //const input = event.target as HTMLInputElement;
    //const newTask = input.value;

    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      //Agregar nuevo elemento al arreglo sin mutar el arreglo original
      if(value !== ''){
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
    
    //Limpiar el input
    //input.value = '';
  }

  //Agregar tarea a un arreglo de objetos con interfaces
  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  //Eliminar una tarea de acuerdo a su indice
  deleteTask(index: number) {
    //Actualiza el estado de las tareas con una funcion arrow para no mostrar la tarea eliminada
    this.tasks.update((tasks) => tasks.filter((task, i) => i !== index));
  }

  //Actualizar el estado de la tarea
  updateTask(index: number) {
    //Actualizar el estado de la tarea
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            //Negar el estado de la tarea
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  }

  newTaskCtrl = new FormControl('', 
    { nonNullable: true,
      validators: [
        Validators.required,
      ]
    });

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return task;
      });
    });
  }

  updateTaskText(index: number, event: Event) {

    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }
}
