import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.component.html',
  styleUrls: ['./buscar-viajes.component.css']
})
export class BuscarViajesComponent implements OnInit {

	formulario: FormGroup;

	constructor() {
		this.formulario = new FormGroup({
			destino: new FormControl(''),
			fecha_inicio: new FormControl(''),
			fecha_fin: new FormControl(''),
			duracion: new FormControl(''),

		});
	}

  ngOnInit() {
  }

}
