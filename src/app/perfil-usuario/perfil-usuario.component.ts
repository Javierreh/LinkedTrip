import { Component, OnInit } from '@angular/core';
import { ViajerosService } from './../viajeros.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

	constructor(private viajerosService: ViajerosService, private router: Router) {

	}

	ngOnInit() {
		if (!localStorage.getItem('token')) {
			this.router.navigate(['/home']);
		}
	}

	onActivate() {
		window.scrollTo(0, 0);
	}


}
