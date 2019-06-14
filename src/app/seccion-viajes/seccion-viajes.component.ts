import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from './../viajes.service';

@Component({
  selector: 'app-seccion-viajes',
  templateUrl: './seccion-viajes.component.html',
  styleUrls: ['./seccion-viajes.component.css']
})
export class SeccionViajesComponent implements OnInit {

	idViajero: number;
	viajes: any;

	constructor(private viajesService: ViajesService, private activatedRoute: ActivatedRoute, private router: Router) {
		this.activatedRoute.parent.params.subscribe(params => {
			this.idViajero = params.id;
		});

		this.viajesService.getAllViajesByIdOrganizador(this.idViajero).subscribe(res => {
			this.viajes = res;
		})

	}

	ngOnInit() {
	}

	handleClick() {
		this.router.navigate(['/usuario', this.idViajero, 'viajes', 'nuevo'])
	}

}
