import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajerosService } from './../viajeros.service';
import * as moment from 'moment';

@Component({
  selector: 'app-seccion-perfil',
  templateUrl: './seccion-perfil.component.html',
  styleUrls: ['./seccion-perfil.component.css']
})
export class SeccionPerfilComponent implements OnInit {

	idViajero: number;
	viajero: any;
	edad: number;

	constructor(private activatedRoute: ActivatedRoute, private viajerosService: ViajerosService, private router: Router) { }

	ngOnInit() {

		if (!localStorage.getItem('token')) {
			this.router.navigate(['/home']);
		}
		else {
			this.viajerosService.getUserById(localStorage.getItem('token')).subscribe(res => {
				this.edad = moment().diff(res[0].fecha_nacimiento, 'years', false);
				if(res[0].intereses != null)
					res[0].intereses = res[0].intereses.split(', ');
				this.viajero = res[0];
			});
		}


		
	}

	handleClick() {
		this.router.navigate(['/usuario', 'perfil', 'editar'])
	}

}
