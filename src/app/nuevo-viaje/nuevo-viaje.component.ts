import { Component, OnInit, ViewChild, Renderer2, ElementRef, HostListener } from '@angular/core';
import { ViajesService } from './../viajes.service';
import { ViajerosService } from './../viajeros.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
declare var google;
declare var $: any;

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.component.html',
  styleUrls: ['./nuevo-viaje.component.css']
})

export class NuevoViajeComponent implements OnInit {

	@ViewChild('div') div: ElementRef;
	@ViewChild('activi') activi: ElementRef;

	destinos: any;
	actividades: any;

	id_viaje_creado: any;

	usuario: any;

	fk_organizador: number;
	uploadPercent: Observable<number>;
	imageUrl: string;
	randomNumber: number;

	formulario: FormGroup;

	constructor(private viajesService: ViajesService, private viajerosService: ViajerosService, private activatedRoute: ActivatedRoute, private router: Router, private storage: AngularFireStorage, private renderer: Renderer2, private elRef: ElementRef) {

		this.destinos = [];
		this.actividades = [];

		// this.activatedRoute.parent.params.subscribe(params => {
		// 	this.fk_organizador = params.id;
		// });

		this.viajerosService.getUserById(localStorage.getItem('token')).subscribe(res => {
			this.usuario = res[0];
		});

		this.randomNumber = Math.round((Math.random() * 10000000000000000000));

		this.formulario = new FormGroup({
			titulo: new FormControl('', [
				Validators.required
				// Validators.minLength(2),
				// Validators.maxLength(20)
			]),
			descripcion: new FormControl('', [
				Validators.required
			]),
			viajeros_max: new FormControl('', [
				Validators.required
			]),
			fecha_inicio: new FormControl('', [
				Validators.required
			]),
			fecha_fin: new FormControl('', [
				Validators.required
			]),
			alojamiento: new FormControl('', [
				Validators.required
			]),
			nivel_economico: new FormControl('', [
				Validators.required
			]),
			etiquetas: new FormControl('', [
				Validators.required
			])
		});
	}

	ngOnInit() {

		$("form").keypress(function(e) {
	  		//Enter key
	  		if (e.which == 13) {
	    		return false;
	  		}
		});

		var options = {
  			types: ['(regions)']
 		};

		let input = document.getElementById('inputPlace');
		let autocomplete = new google.maps.places.Autocomplete(input, options);
		autocomplete.setFields(['address_components', 'geometry', 'name']);
		
		autocomplete.addListener('place_changed', () => {

			let place = autocomplete.getPlace();
			let lista = $('.lista_destinos');

			if (place.address_components) {

				let objetoPlace = { nombre: place.name,
								latitud: place.geometry.location.lat(),
								longitud: place.geometry.location.lng() }

				if (!this.destinos.some(destino => 
					destino.nombre === objetoPlace.nombre &&
					destino.latitud === objetoPlace.latitud &&
					destino.longitud === objetoPlace.longitud)) {

					this.destinos.push(objetoPlace);

					let parent = this.renderer.createElement('div');
					let dest = this.renderer.createElement('span');
					let flecha = this.renderer.createElement('i');
					parent.className = "flecha-y-destino"
					flecha.className = "fas fa-long-arrow-alt-right"
					dest.innerHTML = place.name;
					dest.className = "destino-elegido text-muted";

					this.renderer.appendChild(parent, flecha);
					this.renderer.appendChild(parent, dest);

					this.renderer.appendChild(this.div.nativeElement, parent);

				}
			}

			$('#inputPlace').val('');
			console.log(this.destinos);
		});

	}

	addActividad() {

		this.actividades.push($('#inputActividades').val());
		
		console.log(this.actividades);

		let parent = this.renderer.createElement('div');
		let act = this.renderer.createElement('span');
		let flecha = this.renderer.createElement('i');
		parent.className = "flecha-y-destino";
		// parent.addEventListener("click", this.removeActividad(event));
		flecha.className = "fas fa-long-arrow-alt-right";
		act.innerHTML = $('#inputActividades').val();
		act.className = "destino-elegido text-muted";

		this.renderer.appendChild(parent, flecha);
		this.renderer.appendChild(parent, act);

		this.renderer.appendChild(this.activi.nativeElement, parent);

		$('#inputActividades').val('');

		// }
		// console.log($('#lista_activi'));
	}


	async onSubmit() {
		this.formulario.value.fk_organizador = this.usuario.id;
		this.formulario.value.foto = this.imageUrl;

		this.id_viaje_creado = await this.viajesService.insertViaje(this.formulario.value).toPromise();
		// console.log(this.id_viaje_creado);

		let destino_encontrado;
		let id_temp;

		for (let desti of this.destinos) {

			destino_encontrado = await this.viajesService.getDestinoByAll(desti).toPromise();

			if (destino_encontrado.length === 0) {
				id_temp = await this.viajesService.insertDestino(desti).toPromise();
				await this.viajesService.insertViajesDestinos({ fk_viajes: this.id_viaje_creado, fk_destinos: id_temp }).toPromise();

			}
			else {
				await this.viajesService.insertViajesDestinos({ fk_viajes: this.id_viaje_creado, fk_destinos: destino_encontrado[0].id }).toPromise();
			}
		}

		for (let actividad of this.actividades) {
			await this.viajesService.insertActividad({ fk_viajes: this.id_viaje_creado, nombre: actividad }).toPromise();
		}


		// console.log(this.formulario.value);
		this.formulario.reset();
		this.router.navigate(['usuario', 'viajes'])

	}


	onChangeImage($event) {

		const image = $event.target.files[0];
		console.log(image.type)
		if(image.type === "image/jpeg" || image.type === 'image/png') {
			const filePath = 'viajes/imagen'+ this.randomNumber +'.jpg';
			const fileRef = this.storage.ref(filePath);
			const tarea = this.storage.upload(filePath, image);

			this.uploadPercent = tarea.percentageChanges();

			tarea.snapshotChanges().pipe(
				finalize(async () => {
					this.imageUrl = await fileRef.getDownloadURL().toPromise();
				})
			).subscribe();
		}
		else {
			console.log("Error en formato de imagen");
		}

	}

}
