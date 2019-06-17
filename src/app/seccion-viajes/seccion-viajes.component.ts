import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from './../viajes.service';
import { ViajerosService } from './../viajeros.service';

@Component({
  selector: 'app-seccion-viajes',
  templateUrl: './seccion-viajes.component.html',
  styleUrls: ['./seccion-viajes.component.css']
})
export class SeccionViajesComponent implements OnInit {

	idViajero: number;
	viajes: any;
	viajesParticipo: any;
	usuario: any;

	constructor(private viajesService: ViajesService, private viajerosService: ViajerosService, private activatedRoute: ActivatedRoute, private router: Router) {

		this.viajes = [];
		this.viajesParticipo = [];

	}

	async ngOnInit() {

		this.usuario = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();

		console.log(this.usuario[0].id);

		this.viajesService.getAllViajesByIdOrganizador(this.usuario[0].id).subscribe(res => {

			this.viajes = res;

			if (this.viajes.length == 0) {
				this.viajes = null;
			}

		});

		this.viajesService.getAllViajesByIdUsuario(this.usuario[0].id).subscribe(res => {

			this.viajesParticipo = res;

			if (this.viajesParticipo.length == 0) {
				this.viajesParticipo = null;
			}

		});

	}

	handleClick() {
		this.router.navigate(['/usuario', 'viajes', 'nuevo'])
	}

}
