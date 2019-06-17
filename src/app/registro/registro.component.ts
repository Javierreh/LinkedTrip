import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViajerosService } from './../viajeros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	formulario: FormGroup;

	insertado: any;
	login: any;

	constructor(private viajerosService: ViajerosService, private router: Router) {
		this.formulario = new FormGroup({
			nombre: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(20)
			]),
			apellidos: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(50)
			]),
			usuario: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20)
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(12),
				Validators.pattern(/\d/)
			]),
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
				Validators.maxLength(100)
			])
		});
	}

	ngOnInit() {
		if (localStorage.getItem('token')) {
			this.router.navigate(['/usuario'])
		}
	}
	
	async onSubmit() {
		this.insertado = await this.viajerosService.insertViajero(this.formulario.value).toPromise();

		if (this.insertado.insertId) {
			this.login = await this.viajerosService.loginUser(this.formulario.value).toPromise()
			localStorage.setItem('token', this.login.token);
			this.router.navigate(['/usuario']);
		}
		else {
			this.router.navigate(['/home']);
		}
	}	

}
