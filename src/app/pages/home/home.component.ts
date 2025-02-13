//computed, effect y signal elementos para la reactividad en angular
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
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

  //Tareas vacias para el estado inicial
  tasks = signal<Task[]>([]);

  //Filtrar las tareas
  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  //Agregar una nueva tarea
  changeHandler() {
    //const input = event.target as HTMLInputElement;
    //const newTask = input.value;

    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      //Agregar nuevo elemento al arreglo sin mutar el arreglo original
      if (value !== '') {
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

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  injector = inject(Injector);

  ngOnInit(){
    //Obtiene tareas de localStorage
    const storage = localStorage.getItem('tasks');
    //Valida si existe storage
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trakTasks();
  }

  trakTasks(){
    //Effect permite identificar cualquier cambio en la pagina
    effect(() =>{
      const tasks = this.tasks();
      console.log(tasks);
      //Guarda el objeto en localStorage
      //Se ubica en aplicacion >> storage >> localStorage del inspector
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector : this.injector} );
  }

  //Funcion para editar una sola tarea
  updateTaskEditingMode(index: number) {
    //Si la tarea ya esta completada, no se puede editar
    if (this.tasks()[index].completed) return;

    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  //Actualización del texto de la tarea
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
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

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
