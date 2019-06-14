import { Component, OnInit } from '@angular/core';
import { ViajesService } from './../viajes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.component.html',
  styleUrls: ['./nuevo-viaje.component.css']
})
export class NuevoViajeComponent implements OnInit {

	fk_organizador: number;
	uploadPercent: Observable<number>;
	imageUrl: string;
	randomNumber: number;

	formulario: FormGroup;

	constructor(private viajesService: ViajesService, private activatedRoute: ActivatedRoute, private router: Router, private storage: AngularFireStorage) {

		this.activatedRoute.params.subscribe(params => {
			this.fk_organizador = params.id;
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
	}

	onSubmit() {
		this.formulario.value.fk_organizador = this.fk_organizador;
		this.formulario.value.foto = this.imageUrl;
		this.viajesService.insertViaje(this.formulario.value).subscribe((res) => {
			
		});
		console.log(this.formulario.value);
		this.formulario.reset();
		this.router.navigate(['usuario', this.fk_organizador, 'perfil'])
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
