import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArretsComponent } from './arrets/arrets.component'
import { TempsDattenteComponent } from './temps-dattente/temps-dattente.component';
import { LignesComponent } from './lignes/lignes.component';

const routes: Routes = [
	{ path: '', component: ArretsComponent },
	{ path : ':codeLieu', component: LignesComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	declarations: [ ]
})
export class AppRoutingModule { }
