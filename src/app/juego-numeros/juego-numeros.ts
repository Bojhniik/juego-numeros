// src/app/juego-numeros/juego-numeros.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Para *ngIf
import { FormsModule } from '@angular/forms';  // <-- Para [(ngModel)]

@Component({
  selector: 'app-juego-numeros', 
  standalone: true,
  imports: [ CommonModule, FormsModule ], 
  
template: `
    <div class="container"> 
      <h1>Juego de Números</h1>

      <div class="game-area">
        
        <h2 class="mensaje">{{ mensaje }}</h2>
        
        <div *ngIf="!juegoTerminado">
          <label for="intento">Introduce tu número (1-100):</label>
          <input 
            type="number" 
            id="intento" 
            [(ngModel)]="intento" 
            min="1" 
            max="100">
          
          <button (click)="adivinar()" class="btn-jugar">Adivinar</button>
        </div>

        <button *ngIf="juegoTerminado" (click)="reiniciarJuego()" class="btn-jugar">
          Jugar de nuevo
        </button>
        
        <p class="intentos">Intentos restantes: {{ intentosRestantes }}</p>
      </div>
    </div>
  `,
  styleUrl: './juego-numeros.css'
})
export class JuegoNumeros { // <-- Fíjate que el nombre de la clase puede ser JuegoNumeros o JuegoNumerosComponent
  
  // --- PROPIEDADES ---
  numeroSecreto: number;
  mensaje: string;
  intento: number = 0; 
  intentosRestantes: number = 10;
  juegoTerminado: boolean = false;

  // --- CONSTRUCTOR ---
  constructor() {
    this.numeroSecreto = this.generarNumeroSecreto();
    this.mensaje = 'Adivina el número secreto entre 1 y 100';
  }

  // --- MÉTODOS ---
  private generarNumeroSecreto(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  adivinar(): void {
    if (this.juegoTerminado) return;
    
    this.intentosRestantes--;

    if (this.intento > this.numeroSecreto) {
      this.mensaje = '¡Muy alto! Intenta de nuevo.';
    } else if (this.intento < this.numeroSecreto) {
      this.mensaje = '¡Muy bajo! Intenta de nuevo.';
    } else {
      // Esta era la parte con el error: faltaban llaves
      this.mensaje = `¡Felicidades! Adivinaste el número (${this.numeroSecreto})`;
      this.juegoTerminado = true;
    }

    // Esta parte también debe estar DENTRO de adivinar()
    if (this.intentosRestantes === 0 && !this.juegoTerminado) {
      this.mensaje = `¡Perdiste! El número secreto era: ${this.numeroSecreto}`;
      this.juegoTerminado = true;
    }
  } // <-- Llave que cierra adivinar()

  reiniciarJuego(): void {
    this.numeroSecreto = this.generarNumeroSecreto();
    this.mensaje = 'Adivina el número secreto entre 1 y 100';
    this.intentosRestantes = 10;
    this.juegoTerminado = false;
    this.intento = 0;
  } // <-- Llave que cierra reiniciarJuego()

} // <-- ESTA ES LA LLAVE FINAL QUE CIERRA LA CLASE