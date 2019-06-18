import { Component, OnInit } from '@angular/core';
import { ViajerosService } from './../viajeros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
	usuario: any;

	constructor(public viajerosService: ViajerosService, private router: Router) { }

	async ngOnInit() {
		if (localStorage.getItem('token')){
			this.usuario = await this.viajerosService.getUserById(localStorage.getItem('token')).toPromise();
			this.usuario = this.usuario[0];
		}
		
	}

	signOut() {
		localStorage.removeItem('token');
		this.router.navigate(['/home']);
	}

}
