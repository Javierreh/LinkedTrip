import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ViajerosService {

	constructor(private http: HttpClient) { }

	getUserById(idUsuario) {
		return this.http.get('http://localhost:3000/api/viajeros/'+ idUsuario);
	}

	insertViajero(pFormulario) {
		return this.http.post('http://localhost:3000/api/viajeros/new', pFormulario);
	}

}
