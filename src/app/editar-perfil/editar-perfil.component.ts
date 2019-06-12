import { Component, OnInit } from '@angular/core';
import { ViajerosService } from './../viajeros.service';
import { ActivatedRoute } from '@angular/router';
import * as globals from './../globals';
declare var $: any; 

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

	idViajero: number;
	viajero: any;

	constructor(private activatedRoute: ActivatedRoute, private viajerosService: ViajerosService) {
		this.activatedRoute.parent.params.subscribe(params => {
			this.idViajero = params.id;
		});

	}

	ngOnInit() {
		this.viajerosService.getUserById(this.idViajero).subscribe(async res => {
			// if(res[0].intereses != null)
			// 	res[0].intereses = res[0].intereses.split(', ');
			this.viajero = await res[0];
			this.viajero.todos_idiomas = await globals.idiomas;
		});

		 $(function () {
			
        	$('#select').multipleSelect({
				width: "100%",
		 		minimumCountSelected: 8,
				selectAll: false,
				maxHeight: 170,
				ellipsis: true,
				filter: true,
				filterPlaceholder: 'Buscar idioma',
				formatNoMatchesFound () {
        			return 'Ningún idioma encontrado'
      			}
			})

		})

	}

	selected(idioma) {
		if(this.viajero.idiomas.includes(idioma)) {
			return "selected";
		}
		return null;
	}

}
