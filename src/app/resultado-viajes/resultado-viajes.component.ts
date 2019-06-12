import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultado-viajes',
  templateUrl: './resultado-viajes.component.html',
  styleUrls: ['./resultado-viajes.component.css']
})
export class ResultadoViajesComponent implements OnInit {

	@Input() viajes: any;

	constructor() { }

	ngOnInit() {

	}

}