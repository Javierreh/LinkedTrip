import { Component, OnInit } from '@angular/core';
import { ViajerosService } from './../viajeros.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil-viajero',
  templateUrl: './perfil-viajero.component.html',
  styleUrls: ['./perfil-viajero.component.css']
})
export class PerfilViajeroComponent implements OnInit {

	idViajero: number;
	viajero: any;
	edad: number;
	comentarios: any;

	constructor(private viajerosService: ViajerosService, private activatedRoute: ActivatedRoute) {

	  	this.activatedRoute.params.subscribe(params => {
			this.idViajero = params.id;
		});

	}

	ngOnInit() {

		this.viajerosService.getPerfilById(this.idViajero).subscribe(res => {
			
			this.edad = moment().diff(res[0].fecha_nacimiento, 'years', false);
			if (res[0].intereses != null)
				res[0].intereses = res[0].intereses.split(', ');
			this.viajero = res[0];
			console.log(this.viajero);
		});

		this.viajerosService.getPuntuacionesById(this.idViajero).subscribe(res => {
			this.comentarios = res;
			if (this.comentarios.length == 0) {
				this.comentarios = null;
			}
		})

	}

}
