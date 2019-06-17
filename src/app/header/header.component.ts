import { Component, OnInit } from '@angular/core';
import { ViajerosService } from './../viajeros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public viajerosService: ViajerosService, public router: Router) { }

  ngOnInit() {
  }

  signOut() {
  	localStorage.removeItem('token');
  	this.router.navigate(['/home']);
  }

}
