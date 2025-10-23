import { Routes } from '@angular/router';
import { JuegoNumeros } from './juego-numeros/juego-numeros';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'juego-numeros', component: JuegoNumeros },
  { path: '**', redirectTo: '/home' } 
];