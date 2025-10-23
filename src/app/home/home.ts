import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ mensaje }}</p>
      
      <div class="card-container">
        <div class="card">
          <h3>🎲 Juego de Números</h3>
          <p>¿Podrás obtener el número 7? ¡Pon a prueba tu suerte!</p>
          <a routerLink="/juego-numeros" class="btn-primary">Jugar Ahora</a>
        </div>
        
        <div class="card">
          <h3>📚 Sobre Angular</h3>
          <ul>
            <li>Framework desarrollado por Google</li>
            <li>Basado en TypeScript</li>
            <li>Perfecto para aplicaciones SPA</li>
            <li>Componentes reutilizables</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.css']
})
export class HomeComponent {
  title = '¡Hola Mundo con Angular!';
  mensaje = 'Esta es mi primera aplicación Angular con routing y componentes standalone.';
}