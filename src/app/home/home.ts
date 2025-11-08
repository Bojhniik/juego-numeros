import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent {
  title = '¡Hola Mundo con Angular!';
  mensaje = 'Esta es mi primera aplicación Angular con routing y componentes standalone.';

}

