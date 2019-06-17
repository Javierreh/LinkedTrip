import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { BuscarViajesComponent} from './buscar-viajes/buscar-viajes.component';
import { DetalleViajeComponent} from './detalle-viaje/detalle-viaje.component';
import { PerfilViajeroComponent} from './perfil-viajero/perfil-viajero.component';

import { PerfilUsuarioComponent} from './perfil-usuario/perfil-usuario.component';
import { SeccionPerfilComponent} from './seccion-perfil/seccion-perfil.component';
import { EditarPerfilComponent} from './editar-perfil/editar-perfil.component';
import { SeccionViajesComponent} from './seccion-viajes/seccion-viajes.component';
import { SeccionPeticionesComponent} from './seccion-peticiones/seccion-peticiones.component';
import { SeccionPuntuacionesComponent} from './seccion-puntuaciones/seccion-puntuaciones.component';
import { NuevoViajeComponent } from './nuevo-viaje/nuevo-viaje.component';
import { EditarViajeComponent } from './editar-viaje/editar-viaje.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'registro', component: RegistroComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'buscar/viajes', component: BuscarViajesComponent },
	{ path: 'detalle-viaje/:id', component: DetalleViajeComponent },
	{ path: 'perfil-viajero/:id', component: PerfilViajeroComponent },
	{ 
		path: 'usuario', 
		component: PerfilUsuarioComponent,
		children: [
			{ path: '', redirectTo: 'perfil', pathMatch: 'full' },
			{ path: 'perfil', component: SeccionPerfilComponent },
			{ path: 'perfil/editar', component: EditarPerfilComponent },
			{ path: 'viajes', component: SeccionViajesComponent },
			{ path: 'viajes/nuevo', component: NuevoViajeComponent },
			{ path: 'viajes/editar/:idViaje', component: EditarViajeComponent },
			{ path: 'peticiones', component: SeccionPeticionesComponent },
			{ path: 'puntuaciones', component: SeccionPuntuacionesComponent }
		] 
	},
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
