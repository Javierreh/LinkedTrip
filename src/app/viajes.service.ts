import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get('http://localhost:3000/api/viajes');
	}

	getViajeById(idViaje) {
		return this.http.get('http://localhost:3000/api/viajes/' + idViaje)
	}

	getViajeByIdResumen(idViaje) {
		return this.http.get('http://localhost:3000/api/viajes/resumen/' + idViaje)
	}

	getViajeByIdSimple(idViaje) {
		return this.http.get('http://localhost:3000/api/viajes/simple/' + idViaje)
	}

	filter(pFormulario) {
		return this.http.post('http://localhost:3000/api/viajes/filtrados', pFormulario);
	}

	getAllViajesByIdOrganizador(idOrganizador) {
		return this.http.get('http://localhost:3000/api/viajes/organizador/' + idOrganizador)
	}

	getAllViajesByIdUsuario(idUsuario) {
		return this.http.get('http://localhost:3000/api/viajes/usuario/' + idUsuario)
	}

	insertViaje(pFormulario) {
		return this.http.post('http://localhost:3000/api/viajes/new', pFormulario);
	}

	insertDestino(destino) {
		return this.http.post('http://localhost:3000/api/viajes/destino/new', destino);
	}

	insertViajesDestinos(destino) {
		return this.http.post('http://localhost:3000/api/viajes/viajes_destinos/new', destino);
	}

	getDestinoByAll(datosDestino) {
		return this.http.get('http://localhost:3000/api/viajes/destino/'+ datosDestino.nombre + '/' + datosDestino.longitud + '/' + datosDestino.latitud)
	}

	getDestinosByIdViaje(id_viaje) {
		return this.http.get('http://localhost:3000/api/viajes/destino/viaje/' + id_viaje)
	}

	insertActividad(datosActividad) {
		return this.http.post('http://localhost:3000/api/viajes/actividad/new', datosActividad);
	}

	getActividadesByIdViaje(id_viaje) {
		return this.http.get('http://localhost:3000/api/viajes/actividades/viaje/' + id_viaje)
	}

	editViaje(pFormulario) {
		return this.http.put('http://localhost:3000/api/viajes/edit', pFormulario);
	}

	deleteViaje(id_viaje) {
		return this.http.delete('http://localhost:3000/api/viajes/delete/' + id_viaje);
	}

}
