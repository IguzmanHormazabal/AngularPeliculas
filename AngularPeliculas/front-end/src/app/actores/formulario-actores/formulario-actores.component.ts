import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,) { }

  form: FormGroup;

  @Input()
  modelo: actorDTO;

  @Input()
  errores: string[] = [];

  @Output()
  enviar: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ["",
      {
        validators:[Validators.required],
      },
    ],
      fechaNacimiento: "",
      foto: '',
      biografia: ""
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo)
    }
  }

  archivoSeleccionado(file){
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  Onsubmit(){
    if (!this.imagenCambiada){
      this.form.patchValue({"foto": null});
    }
    this.enviar.emit(this.form.value);
  }

}
