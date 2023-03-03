import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, tileLayer, LeafletMouseEvent, Marker, marker, icon } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = []

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      let marcador = marker([valor.latitud, valor.longitud]);
      if (valor.mensaje) {
        marcador.bindPopup(valor.mensaje, { autoClose: false, autoPan: false });
      }
      return marcador;
    });
    if (this.coordenadasIniciales.length != 0) {
    this.options.center.lat = this.coordenadasIniciales[0].latitud;
    this.options.center.lng = this.coordenadasIniciales[0].longitud; //dirigirse a la posicion guardada en DB
  }
  }

  

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 16,
    center: latLng(9.060140869148489, -79.45388674736024)
  };

 capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){
    
    
    if(!this.soloLectura){
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      this.capas = [];
      this.capas.push(marker([latitud, longitud]));
      this.coordenadaSeleccionada.emit({latitud: latitud, longitud: longitud})
  }
    }

    

  
}
