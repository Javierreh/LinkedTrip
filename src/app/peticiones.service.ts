import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http: HttpClient) { }


	getPeticionesByIdUser(id_usuario) {
		return this.http.get('http://localhost:3000/api/peticiones/usuario/' + id_usuario);
	}

	getPeticionesByIdOrganizador(id_organizador) {
		return this.http.get('http://localhost:3000/api/peticiones/organizador/' + id_organizador);
	}

	insertPeticion(peticion) {
		return this.http.post('http://localhost:3000/api/peticiones/new', peticion);
	}

	aceptarPeticion(id_peticion) {
		return this.http.put('http://localhost:3000/api/peticiones/aceptar', id_peticion);
	}

	deletePeticion(id_peticion) {
		return this.http.delete('http://localhost:3000/api/peticiones/delete/' + id_peticion);
	}

	insertMiembro(values) {
		return this.http.post('http://localhost:3000/api/peticiones/newMiembro', values);
	}

	deleteMiembro(values) {
		return this.http.delete('http://localhost:3000/api/peticiones/deleteMiembro/' + values.fk_viajeros + '/' + values.fk_viajes);
	}

}
