import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajesService } from './../viajes.service';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css']
})
export class DetalleViajeComponent implements OnInit {

	idViaje: number;
	viaje: any;

	constructor(private activatedRoute: ActivatedRoute, private viajesService: ViajesService) {
		this.activatedRoute.params.subscribe(params => {
  			this.idViaje = params.id;
  		});
	}

	ngOnInit() {
		this.viajesService.getViajeById(this.idViaje).subscribe(res => {
			
			if(res[0].etiquetas != null)
				res[0].etiquetas = res[0].etiquetas.split(', ');
			if(res[0].destinos_viaje != null)
				res[0].destinos_viaje = res[0].destinos_viaje.split(' / ');
			if(res[0].actividades_viaje != null)
				res[0].actividades_viaje = res[0].actividades_viaje.split(' / ');
			if(res[0].viajeros_viaje != null)
				res[0].viajeros_viaje = res[0].viajeros_viaje.split(' / ');
			
			this.viaje = res[0];
			console.log(this.viaje);
		});
	}

}
