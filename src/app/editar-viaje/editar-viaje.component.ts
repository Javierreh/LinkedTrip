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
import * as moment from 'moment';

@Component({
  selector: 'app-editar-viaje',
  templateUrl: './editar-viaje.component.html',
  styleUrls: ['./editar-viaje.component.css']
})
export class EditarViajeComponent implements OnInit {

	@ViewChild('div') div: ElementRef;
	@ViewChild('activi') activi: ElementRef;

	destinos: any;
	actividades: any;

	actividadesActuales: any;

	uploadPercent: Observable<number>;
	imageUrl: string;
	randomNumber: number;

	viaje: any;
	idViaje: number;
	usuario: any;

	formulario: FormGroup;

	constructor(private viajesService: ViajesService, private viajerosService: ViajerosService, private activatedRoute: ActivatedRoute, private router: Router, private storage: AngularFireStorage, private renderer: Renderer2, private elRef: ElementRef) {

		this.activatedRoute.params.subscribe(params => {
			this.idViaje = params.idViaje;
			console.log(this.idViaje);
		});

		this.destinos = [];
		this.actividades = [];

		this.randomNumber = Math.round((Math.random() * 10000000000000000000));

		
	}

	async ngOnInit() {

		this.viaje = await this.viajesService.getViajeByIdSimple(this.idViaje).toPromise();
		this.viaje = this.viaje[0];
		console.log(this.viaje);

		this.usuario = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();
		

		if (this.usuario[0].id != this.viaje.fk_organizador) {
			this.router.navigate(['usuario', 'viajes'])
		}
		else {
			// console.log('holaaa ' + this.viaje.id);

			this.viaje.fecha_inicio = moment(this.viaje.fecha_inicio).format('YYYY-MM-DD');
			this.viaje.fecha_fin = moment(this.viaje.fecha_fin).format('YYYY-MM-DD');


			this.formulario = await new FormGroup({
				id: new FormControl(this.viaje.id, [
					Validators.required
				]),
				titulo: new FormControl(this.viaje.titulo, [
					Validators.required
				]),
				descripcion: new FormControl(this.viaje.descripcion, [
					Validators.required
				]),
				viajeros_max: new FormControl(this.viaje.viajeros_max, [
					Validators.required
				]),
				fecha_inicio: new FormControl(this.viaje.fecha_inicio, [
					Validators.required
				]),
				fecha_fin: new FormControl(this.viaje.fecha_fin, [
					Validators.required
				]),
				alojamiento: new FormControl(this.viaje.alojamiento, [
					Validators.required
				]),
				nivel_economico: new FormControl(this.viaje.nivel_economico, [
					Validators.required
				]),
				etiquetas: new FormControl(this.viaje.etiquetas, [
					Validators.required
				]),
				foto: new FormControl(this.viaje.foto, [
					Validators.required
				]),
			});

			console.log(this.formulario.value);


			$("form").keypress(function(e) {
		  		//Enter key
		  		if (e.which == 13) {
		    		return false;
		  		}
			});

			var options = {
	  			types: ['(regions)']
	 		};

			
			let input;
			let autocomplete;

			setTimeout(() => {
				input = document.getElementById('inputPlace');
				console.log(input);
				autocomplete = new google.maps.places.Autocomplete(input, options);
			}, 200)

			
			// autocomplete.setFields(['address_components', 'geometry', 'name']);
			
			// autocomplete.addListener('place_changed', () => {

			// 	let place = autocomplete.getPlace();
			// 	let lista = $('.lista_destinos');

			// 	if (place.address_components) {

			// 		let objetoPlace = { nombre: place.name,
			// 						latitud: place.geometry.location.lat(),
			// 						longitud: place.geometry.location.lng() }

			// 		if (!this.destinos.some(destino => 
			// 			destino.nombre === objetoPlace.nombre &&
			// 			destino.latitud === objetoPlace.latitud &&
			// 			destino.longitud === objetoPlace.longitud)) {

			// 			this.destinos.push(objetoPlace);

			// 			let parent = this.renderer.createElement('div');
			// 			let dest = this.renderer.createElement('span');
			// 			let flecha = this.renderer.createElement('i');
			// 			parent.className = "flecha-y-destino"
			// 			flecha.className = "fas fa-long-arrow-alt-right"
			// 			dest.innerHTML = place.name;
			// 			dest.className = "destino-elegido text-muted";

			// 			this.renderer.appendChild(parent, flecha);
			// 			this.renderer.appendChild(parent, dest);

			// 			this.renderer.appendChild(this.div.nativeElement, parent);

			// 		}
			// 	}

			// 	$('#inputPlace').val('');

			// });

			this.destinos = await this.viajesService.getDestinosByIdViaje(this.viaje.id).toPromise();
			console.log(this.destinos);

			let lista = $('.lista_destinos');

			for(let destino of this.destinos) {

				let parent = this.renderer.createElement('div');
				let dest = this.renderer.createElement('span');
				let flecha = this.renderer.createElement('i');
				parent.className = "flecha-y-destino"
				flecha.className = "fas fa-long-arrow-alt-right"
				dest.innerHTML = destino.nombre;
				dest.className = "destino-elegido text-muted";

				this.renderer.appendChild(parent, flecha);
				this.renderer.appendChild(parent, dest);

				this.renderer.appendChild(this.div.nativeElement, parent);

			}


			this.actividadesActuales = await this.viajesService.getActividadesByIdViaje(this.viaje.id).toPromise();
			console.log(this.actividadesActuales);

			// let lista = $('.lista_destinos');

			for(let actividad of this.actividadesActuales) {

				let parent = this.renderer.createElement('div');
				let act = this.renderer.createElement('span');
				let flecha = this.renderer.createElement('i');
				parent.className = "flecha-y-destino"
				flecha.className = "fas fa-long-arrow-alt-right"
				act.innerHTML = actividad.nombre;
				act.className = "destino-elegido text-muted";

				this.renderer.appendChild(parent, flecha);
				this.renderer.appendChild(parent, act);

				this.renderer.appendChild(this.activi.nativeElement, parent);
			}

		}
	}


	// addActividad() {

	// 	this.actividades.push($('#inputActividades').val());
		
	// 	console.log(this.actividades);

	// 	let parent = this.renderer.createElement('div');
	// 	let act = this.renderer.createElement('span');
	// 	let flecha = this.renderer.createElement('i');
	// 	parent.className = "flecha-y-destino";
	// 	flecha.className = "fas fa-long-arrow-alt-right";
	// 	act.innerHTML = $('#inputActividades').val();
	// 	act.className = "destino-elegido text-muted";

	// 	this.renderer.appendChild(parent, flecha);
	// 	this.renderer.appendChild(parent, act);

	// 	this.renderer.appendChild(this.activi.nativeElement, parent);

	// 	$('#inputActividades').val('');

	// }


	onSubmit() {
		this.formulario.value.fk_organizador = this.viaje.fk_organizador;
		
		if(this.imageUrl){
			this.formulario.value.foto = this.imageUrl;
		}
		
		this.viajesService.editViaje(this.formulario.value).subscribe((res) => {
			console.log(this.formulario.value);
		});
		
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
