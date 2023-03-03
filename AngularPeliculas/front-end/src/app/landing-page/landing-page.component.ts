import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../peliculas/pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private peliculasService: PeliculasService) { }



  ngOnInit(): void {
    this.peliculasService.obtenerLandingPage().subscribe(landingpage =>{
      this.peliculasEnCines = landingpage.enCines;
      this.peliculasProxEstrenos = landingpage.proximosEstrenos;
    })
  }
    peliculasEnCines: PeliculaDTO[];
    peliculasProxEstrenos: PeliculaDTO[];
  }
