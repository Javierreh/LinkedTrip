import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from './../viajes.service';
import { ViajerosService } from './../viajeros.service';
import { PeticionesService } from './../peticiones.service';

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

	constructor(private peticionesService: PeticionesService, private viajesService: ViajesService, private viajerosService: ViajerosService, private activatedRoute: ActivatedRoute, private router: Router) {

		this.viajes = [];
		this.viajesParticipo = [];

	}

	async ngOnInit() {

		this.usuario = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();

		// console.log(this.usuario[0].id);

		this.viajes = await this.viajesService.getAllViajesByIdOrganizador(this.usuario[0].id).toPromise();

			if (this.viajes.length == 0) {
				this.viajes = null;
			}


		this.viajesParticipo = await this.viajesService.getAllViajesByIdUsuario(this.usuario[0].id).toPromise();

			if (this.viajesParticipo.length == 0) {
				this.viajesParticipo = null;
			}


	}

	handleClick() {
		this.router.navigate(['/usuario', 'viajes', 'nuevo'])
	}

	async salirViaje(i) {

		let datosMiembro = { fk_viajeros: this.usuario[0].id, fk_viajes: this.viajesParticipo[i].id }

		await this.peticionesService.deleteMiembro(datosMiembro).toPromise();
		
		window.location.reload();
	}

	async eliminarViaje(i) {
		console.log(this.viajes[i].id);
		console.log(this.viajes[i]);

		await this.viajesService.deleteViaje(this.viajes[i].id).toPromise();
		window.location.reload();

	}

}
