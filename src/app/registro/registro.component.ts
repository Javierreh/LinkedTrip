import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	formulario: FormGroup;

	constructor() {
		this.formulario = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(20)
			]),
			surname: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(50)
			]),
			username: new FormControl('', [
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
		console.log(this.formulario.value);
		this.formulario.reset();
	}	

}
