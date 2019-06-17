import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscarViajesComponent } from './buscar-viajes/buscar-viajes.component';
import { DetalleViajeComponent } from './detalle-viaje/detalle-viaje.component';
import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ResultadoViajesComponent } from './resultado-viajes/resultado-viajes.component';
import { PerfilViajeroComponent } from './perfil-viajero/perfil-viajero.component';
import { SeccionPerfilComponent } from './seccion-perfil/seccion-perfil.component';
import { SeccionViajesComponent } from './seccion-viajes/seccion-viajes.component';
import { SeccionPeticionesComponent } from './seccion-peticiones/seccion-peticiones.component';
import { SeccionPuntuacionesComponent } from './seccion-puntuaciones/seccion-puntuaciones.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { environment } from 'src/environments/environment';
import { NuevoViajeComponent } from './nuevo-viaje/nuevo-viaje.component';
import { EditarViajeComponent } from './editar-viaje/editar-viaje.component';
import { EnviarPeticionComponent } from './enviar-peticion/enviar-peticion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    BuscarViajesComponent,
    DetalleViajeComponent,
    LoginComponent,
    PerfilUsuarioComponent,
    ResultadoViajesComponent,
    PerfilViajeroComponent,
    SeccionPerfilComponent,
    SeccionViajesComponent,
    SeccionPeticionesComponent,
    SeccionPuntuacionesComponent,
    EditarPerfilComponent,
    NuevoViajeComponent,
    EditarViajeComponent,
    EnviarPeticionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
