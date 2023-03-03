import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErrorAPI } from 'src/app/utilidades/utilidades';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';


@Component({
  selector: 'app-crear-generos',
  templateUrl: './crear-generos.component.html',
  styleUrls: ['./crear-generos.component.css']
})
export class CrearGenerosComponent {

  @Input()
  errores: string[] = [];

  constructor(private router: Router, private generosService: GenerosService) { }

  guardarCambios(genero: generoCreacionDTO){
    this.generosService.crear(genero).subscribe({
      next: () => this.router.navigate(["/generos"]),
      error: (error) => this.errores = parsearErrorAPI(error)
    })
    
  }
}
