import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViajerosService } from './../viajeros.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	formulario: FormGroup;

	constructor(private viajerosService: ViajerosService) {
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
	}
	
	onSubmit() {
		this.viajerosService.insertViajero(this.formulario.value).subscribe((res) => {
			
		});

		this.formulario.reset();
	}	

}
