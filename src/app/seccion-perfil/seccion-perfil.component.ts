import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajerosService } from './../viajeros.service';
import * as moment from 'moment';

@Component({
  selector: 'app-seccion-perfil',
  templateUrl: './seccion-perfil.component.html',
  styleUrls: ['./seccion-perfil.component.css']
})
export class SeccionPerfilComponent implements OnInit {

	idViajero: number;
	viajero: any;
	edad: number;

	constructor(private activatedRoute: ActivatedRoute, private viajerosService: ViajerosService) {
		this.activatedRoute.parent.params.subscribe(params => {
			this.idViajero = params.id;
		});
	}

	ngOnInit() {
		this.viajerosService.getUserById(this.idViajero).subscribe(res => {
			this.edad = moment().diff(res[0].fecha_nacimiento, 'years', false);
			if(res[0].intereses != null)
				res[0].intereses = res[0].intereses.split(', ');
			this.viajero = res[0];
			console.log(this.viajero);
		});
	}

}
