//Importar el modulo de rutas de Angular
import { Routes } from '@angular/router';
//Importar el componente Labs
import { LabsComponent } from './pages/labs/labs.component';
//Importar el componente Home	
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'labs',
        component: LabsComponent
    }, 
    {   
        path: 'home',
        component: HomeComponent
    }
];
