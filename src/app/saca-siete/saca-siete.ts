// src/app/juego-numeros/juego-numeros.ts

// 1. IMPORTA RouterLink (¡NUEVO!)
import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- ¡IMPORTANTE!

@Component({
  selector: 'app-juego-numeros',
  standalone: true,
  
  // 2. AÑADE RouterLink a los imports
  imports: [ CommonModule, RouterLink ], 
  
  // 3. BORRA la propiedad 'template: `...`' 
  //    Y reemplázala por 'templateUrl'

  templateUrl: './saca-siete.html', 
  styleUrl: './saca-siete.css'
  
})
export class JuegoNumeros {

  //
  // ¡TODA LA LÓGICA DE SIGNALS (constructor, métodos, etc.)
  // QUEDA EXACTAMENTE IGUAL QUE ANTES!
  //

  numeroActual = signal(0);
  mensaje = signal('🎲 Presiona el botón para empezar');
  intentos = signal(0);
  haGanado = signal(false);
  historial = signal<number[]>([]);
  puntuacion = signal(0);

  estadoJuego = computed(() => {
    if (this.haGanado()) return '🎉 ¡GANASTE!';
    if (this.intentos() === 0) return '🎮 ¡Listo para jugar!';
    return `🎯 Intento ${this.intentos()}`;
  });

  nivelDificultad = computed(() => {
    const intentos = this.intentos();
    if (intentos < 3) return '🟢 Fácil';
    if (intentos < 6) return '🟡 Medio';
    return '🔴 Difícil';
  });

  constructor() {
    const datosGuardados = localStorage.getItem('juegoNumeros');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      this.puntuacion.set(datos.puntuacion || 0);
    }
    effect(() => {
      const datos = {
        puntuacion: this.puntuacion(),
        ultimaPartida: new Date().toISOString()
      };
      localStorage.setItem('juegoNumeros', JSON.stringify(datos));
    });
  } 

  generarNumero() {
    const nuevoNumero = Math.floor(Math.random() * 10) + 1;
    this.historial.update(hist => [...hist, nuevoNumero]);
    this.numeroActual.set(nuevoNumero);
    this.intentos.update(i => i + 1);

    if (nuevoNumero === 7) {
      const puntos = Math.max(100 - (this.intentos() * 10), 10);
      this.puntuacion.update(p => p + puntos);
      this.mensaje.set('🎉 ¡INCREÍBLE! ¡Obtuviste el 7! 🎉');
      this.haGanado.set(true);
    } else if (nuevoNumero > 7) {
      this.mensaje.set('📈 ¡Muy alto! El 7 es menor');
    } else {
      this.mensaje.set('📉 ¡Muy bajo! El 7 es mayor');
    }
  } 

  reiniciarJuego() {
    this.numeroActual.set(0);
    this.mensaje.set('🎲 Presiona el botón para empezar');
    this.intentos.set(0);
    this.haGanado.set(false);
  } 
}