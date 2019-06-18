import { Component, OnInit } from '@angular/core';
import { ViajesService } from './../viajes.service';
import { ViajerosService } from './../viajeros.service';
import { PeticionesService } from './../peticiones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-enviar-peticion',
  templateUrl: './enviar-peticion.component.html',
  styleUrls: ['./enviar-peticion.component.css']
})
export class EnviarPeticionComponent implements OnInit {

	viaje: any;
	usuario: any;
	idViaje: number;

	// organizador: any;

	formulario: FormGroup;

	constructor(private peticionesService: PeticionesService, private viajesService: ViajesService, private viajerosService: ViajerosService, private activatedRoute: ActivatedRoute, private router: Router) {
		this.activatedRoute.params.subscribe(params => {
			this.idViaje = Number(params.id);
		});

		this.formulario = new FormGroup({
			comentario: new FormControl('', [
				Validators.required
			])
		});
	}

	async ngOnInit() {
		if (!localStorage.getItem('token')) {
			this.router.navigate(['/login']);
		}
		else {
			this.viaje = await this.viajesService.getViajeByIdResumen(this.idViaje).toPromise();
			this.viaje = this.viaje[0];

			this.usuario = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();
			this.usuario = this.usuario[0];
		}
	}

	async onSubmit() {
		this.formulario.value.fk_viajes = this.idViaje;
		this.formulario.value.fk_viajeros = this.usuario.id;
		console.log(this.formulario.value);

		await this.peticionesService.insertPeticion(this.formulario.value).toPromise();

		this.router.navigate(['/usuario/peticiones']);
	}

}
