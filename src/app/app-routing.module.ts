import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { BuscarViajesComponent} from './buscar-viajes/buscar-viajes.component';
import { DetalleViajeComponent} from './detalle-viaje/detalle-viaje.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'registro', component: RegistroComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'buscar/viajes', component: BuscarViajesComponent },
	{ path: 'detalle-viaje/:id', component: DetalleViajeComponent },
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
