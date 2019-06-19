import { Component, OnInit } from '@angular/core';
import { ViajesService } from './../viajes.service';
import { ViajerosService } from './../viajeros.service';
import { PeticionesService } from './../peticiones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seccion-peticiones',
  templateUrl: './seccion-peticiones.component.html',
  styleUrls: ['./seccion-peticiones.component.css']
})
export class SeccionPeticionesComponent implements OnInit {

	usuario: any;
	peticionesEnviadas: any;
	peticionesRecibidas: any;

	constructor(private viajesService: ViajesService, private viajerosService: ViajerosService, private peticionesService: PeticionesService, private router: Router) { }

	async ngOnInit() {

		if (!localStorage.getItem('token')) {
			this.router.navigate(['/login']);
		}
		else {

			this.usuario = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();
			this.usuario = this.usuario[0];
			console.log(this.usuario);

			this.peticionesEnviadas = await this.peticionesService.getPeticionesByIdUser(this.usuario.id).toPromise();
			console.log(this.peticionesEnviadas);

			if (this.peticionesEnviadas.length == 0) {
				this.peticionesEnviadas = null;
			}

			this.peticionesRecibidas = await this.peticionesService.getPeticionesByIdOrganizador(this.usuario.id).toPromise();
			console.log(this.peticionesRecibidas);

			if (this.peticionesRecibidas.length == 0) {
				this.peticionesRecibidas = null;
			}

		}
	}

	async cancelarPeticion(i) {
		await this.peticionesService.deletePeticion(this.peticionesEnviadas[i].id_peticion).toPromise();
		
		window.location.reload();
	}

	async descartarPeticion(i) {
		console.log(this.peticionesRecibidas[i].id_peticion);
		await this.peticionesService.deletePeticion(this.peticionesRecibidas[i].id_peticion).toPromise();
		
		// this.router.navigate(['/usuario', 'peticiones']);
		window.location.reload();
	}


	async perfilViajero(i) {
		this.router.navigate(['/perfil-viajero', this.peticionesRecibidas[i].id_viajero])
	}


	async aceptoPeticion(i) {
		let datosInsertMiembro = { fk_viajeros: this.peticionesRecibidas[i].id_viajero, fk_viajes: this.peticionesRecibidas[i].id_viaje }
		console.log(datosInsertMiembro);
		let prueba;
		prueba = await this.peticionesService.insertMiembro(datosInsertMiembro).toPromise();
		console.log(prueba);
		let datos = { id_peticion:  this.peticionesRecibidas[i].id_peticion }

		await this.peticionesService.aceptarPeticion(datos).toPromise();

		window.location.reload();
	}

}
