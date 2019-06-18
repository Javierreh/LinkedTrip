import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from './../viajes.service';
declare var google;

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.component.html',
  styleUrls: ['./detalle-viaje.component.css']
})
export class DetalleViajeComponent implements OnInit {

	idViaje: number;
	viaje: any;
	destinos: any;

	@ViewChild('googleMap') divMap: any;
	map: any;
	markers: any[];

	constructor(private activatedRoute: ActivatedRoute, private viajesService: ViajesService, private router: Router) {
		this.activatedRoute.params.subscribe(params => {
  			this.idViaje = params.id;
  		});

  		this.markers = [];
	}

	async ngOnInit() {

		this.viaje = await this.viajesService.getViajeById(this.idViaje).toPromise();

		if (this.viaje[0].id == null) {
			this.router.navigate(['/buscar', 'viajes']);
		}
		else {

			this.viaje = this.viaje[0];

			if(this.viaje.etiquetas != null)
				this.viaje.etiquetas = this.viaje.etiquetas.split(', ');
			if(this.viaje.destinos_viaje != null)
				this.viaje.destinos_viaje = this.viaje.destinos_viaje.split(' / ');
			if(this.viaje.actividades_viaje != null)
				this.viaje.actividades_viaje = this.viaje.actividades_viaje.split(' / ');
			if(this.viaje.viajeros_viaje != null)
				this.viaje.viajeros_viaje = this.viaje.viajeros_viaje.split(' / ');
								
			console.log(this.viaje);

			this.destinos = await this.viajesService.getDestinosByIdViaje(this.idViaje).toPromise();

			console.log(this.destinos);

			if (this.destinos.length > 0) {

				let propsMap;

				propsMap = {
					center: new google.maps.LatLng(this.destinos[0].latitud, this.destinos[0].longitud),
					zoom: 6,
					mapTypeId: google.maps.MapTypeId.HYBRID
				}

				setTimeout(() => {

					this.map = new google.maps.Map(this.divMap.nativeElement, propsMap)

					for (let destino of this.destinos) {

						let myLatlng = {lat: destino.latitud, lng: destino.longitud} 

						let marker = new google.maps.Marker({
							position: myLatlng,
							map: this.map,
							title: destino.nombre
						});
					}
					
				}, 500)

			}
		
		}
		// for (let destino of this.destinos) {
			


			// this.markers.push(marker);

		// }

		// console.log(this.marker);
	}

}
