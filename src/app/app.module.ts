import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ArretService } from './arret.service';
import { AppRoutingModule } from './/app-routing.module';
import { ArretsComponent } from './arrets/arrets.component';
import { TempsDattenteComponent } from './temps-dattente/temps-dattente.component';
import { TempsDattenteService } from './temps-dattente.service';
import { LignesComponent } from './lignes/lignes.component';


@NgModule({
	declarations: [
		AppComponent,
		ArretsComponent,
		TempsDattenteComponent,
		LignesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		HttpClientJsonpModule,
		AppRoutingModule
	],
	providers: [
		ArretService,
		TempsDattenteService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
