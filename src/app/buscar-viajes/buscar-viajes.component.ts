import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViajesService } from './../viajes.service';

@Component({
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.component.html',
  styleUrls: ['./buscar-viajes.component.css']
})
export class BuscarViajesComponent implements OnInit {

	formulario: FormGroup;
	viajes: any;

	constructor(private viajesService: ViajesService) {
		this.formulario = new FormGroup({
			destino: new FormControl(''),
			fecha_inicio: new FormControl(''),
			fecha_fin: new FormControl(''),
			duracion: new FormControl(''),
			viajeros_max: new FormControl(''),
			tipo_turismo: new FormControl(''),
			tipo_alojamiento: new FormControl(''),
			nivel_economico: new FormControl('')
		});
	}

	ngOnInit() {
		this.viajesService.getAll().subscribe((res) => {
			this.viajes = res;
		});
	}

	onSubmit() {
		console.log(this.formulario.value);
		this.formulario.reset();
	}

}
