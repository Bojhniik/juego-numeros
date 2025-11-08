import { Routes } from '@angular/router';
import { JuegoNumeros } from './saca-siete/saca-siete';
import { AdivinaNumeroComponent } from './adivina-numero/adivina-numero';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'juego-numeros', component: JuegoNumeros },
  { path: 'adivina_numero', component: AdivinaNumeroComponent },
  { path: '**', redirectTo: '/home' } 
];