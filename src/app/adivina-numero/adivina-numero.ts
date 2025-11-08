import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// INTERFAZ: Define la estructura de nuestro historial
interface HistorialSecreto {
  numero: number;
  adivinado: boolean;
}

@Component({
  selector: 'app-adivina-numero',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './adivina-numero.html',
  styleUrl: './adivina-numero.css'
})
export class AdivinaNumeroComponent {
  // Signals de estado
  numeroSecreto = signal(this.generarNumero());
  intento = signal<number | null>(null);
  mensaje = signal('🔮 Adivina el número secreto entre 1 y 100');
  intentosRestantes = signal(10);
  juegoTerminado = signal(false);
  haGanado = signal(false);
  historialIntentos = signal<number[]>([]);
  pista = signal('');

  // El signal usa la interfaz
  historialSecretos = signal<HistorialSecreto[]>([]);

  // Constructor
  constructor() {
    // Carga el historial de objetos
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('historialAdivinaNumero');
      if (data) {
        // Parsea los objetos guardados
        this.historialSecretos.set(JSON.parse(data) as HistorialSecreto[]);
      }
    }
    
    // El 'effect' para guardar funciona igual, ahora guarda objetos
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('historialAdivinaNumero', JSON.stringify(this.historialSecretos()));
      }
    });
  }

  private generarNumero(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  // --- MÉTODO ADIVINAR  ---
  adivinar(): void {
    if (this.juegoTerminado() || this.intento() === null) return;

    const guess = this.intento() as number;

    this.historialIntentos.update(hist => [...hist, guess]);
    this.intentosRestantes.update(v => v - 1);

    if (guess === this.numeroSecreto()) {
      this.mensaje.set(`✅ ¡Felicidades! Adivinaste el número (${this.numeroSecreto()})`);
      this.juegoTerminado.set(true);
      this.haGanado.set(true);
    } else if (guess > this.numeroSecreto()) {
      this.mensaje.set('🔼 ¡Muy alto! Intenta de nuevo.');
    } else {
      this.mensaje.set('🔽 ¡Muy bajo! Intenta de nuevo.');
    }

    if (this.intentosRestantes() === 0 && !this.haGanado()) {
      this.mensaje.set(`❌ ¡Perdiste! El número secreto era: ${this.numeroSecreto()}`);
      this.juegoTerminado.set(true);
    }

    // LÓGICA ACTUALIZADA: Guarda el objeto completo
    if (this.juegoTerminado()) {
      // Crea el nuevo registro para el historial
      const nuevoRegistro: HistorialSecreto = {
        numero: this.numeroSecreto(),
        adivinado: this.haGanado() // ¡Guardamos si ganó o no!
      };
      
      // Añade el registro al principio de la lista
      this.historialSecretos.update(hist => [nuevoRegistro, ...hist]);
    }
    
    if (!this.juegoTerminado()) {
      this.intento.set(null);
    }
  }

  // --- MÉTODO REINICIAR ---
  reiniciarJuego(): void {
    this.numeroSecreto.set(this.generarNumero());
    this.mensaje.set('🔮 Adivina el número secreto entre 1 y 100');
    this.intentosRestantes.set(10);
    this.juegoTerminado.set(false);
    this.haGanado.set(false);
    this.intento.set(null);
    this.historialIntentos.set([]);
    this.pista.set('');
  }

  // --- MÉTODO DE PISTA  ---
  darPista(): void {
    if (this.pista() !== '' || this.intentosRestantes() <= 3 || this.juegoTerminado()) return;
    this.intentosRestantes.update(v => v - 3);
    const esPar = this.numeroSecreto() % 2 === 0;
    this.pista.set(esPar ? '💡 Pista: El número es PAR' : '💡 Pista: El número es IMPAR');
  }
}
