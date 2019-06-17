import { Component, OnInit } from '@angular/core';
import { ViajerosService } from './../viajeros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

	formulario: FormGroup;
	idViajero: number;
	viajeroObj: Object;
	viajero: any;
	uploadPercent: Observable<number>;
	imageUrl: string;
	editado: any;

	constructor(private activatedRoute: ActivatedRoute, private viajerosService: ViajerosService, private storage: AngularFireStorage, private router: Router) {
		// this.activatedRoute.parent.params.subscribe(params => {
		// 	this.idViajero = params.id;
		// });
	}

	async ngOnInit() {
		
		this.viajeroObj = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();

		this.viajero = this.viajeroObj[0];
		this.viajero.fecha_nacimiento = moment(this.viajero.fecha_nacimiento).format('YYYY-MM-DD');

		this.formulario = new FormGroup({
			id: new FormControl(this.viajero.id, [
				Validators.required
			]),
			usuario: new FormControl(this.viajero.usuario, [
				Validators.required
			]),
			email: new FormControl(this.viajero.email, [
				Validators.required
			]),
			// password: new FormControl('******', [
			// 	Validators.required
			// ]),
			nombre: new FormControl(this.viajero.nombre, [
				Validators.required
			]),
			apellidos: new FormControl(this.viajero.apellidos, [
				Validators.required
			]),
			foto_perfil: new FormControl(this.viajero.foto_perfil, [
				Validators.required
			]),
			sobre_mi: new FormControl(this.viajero.sobre_mi, [
				Validators.required
			]),
			ciudad: new FormControl(this.viajero.ciudad, [
				Validators.required
			]),
			sexo: new FormControl(this.viajero.sexo, [
				Validators.required
			]),
			fecha_nacimiento: new FormControl(this.viajero.fecha_nacimiento, [
				Validators.required
			]),
			educacion: new FormControl(this.viajero.educacion, [
				Validators.required
			]),
			ocupacion: new FormControl(this.viajero.ocupacion, [
				Validators.required
			]),
			idiomas: new FormControl(this.viajero.idiomas, [
				Validators.required
			]),
			intereses: new FormControl(this.viajero.intereses, [
				Validators.required
			]),
		});
		console.log(this.formulario.value);
		console.log(this.formulario.value.fecha_nacimiento)
	}



	async onSubmit() {
		if (this.imageUrl) {
			this.formulario.value.foto_perfil = this.imageUrl;
		}
		console.log(this.formulario.value);
		this.formulario.value.password = this.viajero.password;
		this.editado = await this.viajerosService.editUsuario(this.formulario.value).toPromise()
		this.router.navigate(['usuario', 'perfil'])
	}

	onChangeImage($event) {
		const image = $event.target.files[0];
		console.log(image.type)
		if(image.type === "image/jpeg" || image.type === 'image/png') {
			const filePath = 'usuarios/foto_perfil_'+ this.viajero.id +'.jpg';
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
