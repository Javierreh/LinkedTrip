import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViajerosService } from './../viajeros.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  error: any;

	constructor(private viajerosService: ViajerosService, private router: Router) {
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
		// console.log(this.formulario.value);
		this.viajerosService.loginUser(this.formulario.value).subscribe(res => {
			localStorage.setItem('token', res["token"]);
			if (res["token"]) {
				this.router.navigate(['usuario'])
			}
			else {
				this.error = res['error'];
				this.formulario.reset();
			}
		});
		// 
	}	

}
