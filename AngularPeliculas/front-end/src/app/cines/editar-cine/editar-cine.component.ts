import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErrorAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

constructor(private router: Router,
    private cinesServices: CinesService,
    private activatedRoute: ActivatedRoute) { }

 modelo: cineDTO;
 errores: string[] = []

 ngOnInit(): void {
   this.activatedRoute.params.subscribe(params =>{
     this.cinesServices.obtenerPorId(params.id)
     .subscribe(genero => {
       this.modelo = genero;
     }, () => this.router.navigate(["/cines"]))

   })
   

 }

 guardarCambios(cine: cineCreacionDTO){
   this.cinesServices.editar(this.modelo.id, cine).subscribe(() =>{
     this.router.navigate(["/cines"]);
   }, error => this.errores = parsearErrorAPI(error))
   
 }
}
