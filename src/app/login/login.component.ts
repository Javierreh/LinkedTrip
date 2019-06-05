import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

	constructor() {
		this.formulario = new FormGroup({
			usuario: new FormControl('', [
				Validators.required
			]),
			password: new FormControl('', [
				Validators.required
			]),
		});
	}

	ngOnInit() {
	}

  	onSubmit() {
		console.log(this.formulario.value);
		this.formulario.reset();
	}	

}
