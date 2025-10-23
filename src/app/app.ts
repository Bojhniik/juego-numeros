import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = signal('Mi Aplicación Angular');
  mensaje = signal('¡Bienvenido a Angular 20.2!');
  contador = signal(0);
  mostrarInfo = signal(false);

  cambiarMensaje() {
    const mensajes = [
      '¡Bienvenido a Angular 20.2!',
      '¡Angular está evolucionando!',
      '¡Signals son geniales!'
    ];
    const random = Math.floor(Math.random() * mensajes.length);
    this.mensaje.set(mensajes[random]);
    this.contador.set(this.contador() + 1);
  }

  toggleInfo() {
    this.mostrarInfo.set(!this.mostrarInfo());
  }

  reiniciar() {
    this.mensaje.set('¡Bienvenido a Angular 20.2!');
    this.contador.set(0);
    this.mostrarInfo.set(false);
  }
}