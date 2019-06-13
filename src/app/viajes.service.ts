import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}