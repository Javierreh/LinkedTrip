import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ViajerosService {

	constructor(private http: HttpClient) { }

	// getUserById(idUsuario) {
	// 	return this.http.get('http://localhost:3000/api/viajeros/usuario/'+ idUsuario);
	// }

	getUserById(pToken) {
		let headers = new HttpHeaders();
		headers = headers.set('token', pToken);
		return this.http.get('http://localhost:3000/api/viajeros/usuario', {headers: headers});
	}

	getPerfilById(idUsuario) {
		return this.http.get('http://localhost:3000/api/viajeros/'+ idUsuario);
	}

	getPuntuacionesById(idUsuario) {
		return this.http.get('http://localhost:3000/api/viajeros/puntuaciones/'+ idUsuario);
	}

	insertViajero(pFormulario) {
		return this.http.post('http://localhost:3000/api/viajeros/new', pFormulario);
	}

	editUsuario(pFormulario) {
		return this.http.put('http://localhost:3000/api/viajeros/edit', pFormulario);
	}

	loginUser(pFormulario) {
		return this.http.post('http://localhost:3000/api/viajeros/login', pFormulario);
	}

	isUserLogged() {
		if (localStorage.getItem('token')) {
			return true;
		}
		else {
			return false;
		}
	}

}
