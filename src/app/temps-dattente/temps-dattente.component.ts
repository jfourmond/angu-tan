import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Arret } from '../beans/arret';
import { TempsDattente } from '../beans/temps-dattente';
import { TempsDattenteService } from '../temps-dattente.service';

@Component({
	selector: 'app-temps-dattente',
	templateUrl: './temps-dattente.component.html',
	styleUrls: ['./temps-dattente.component.css']
})
export class TempsDattenteComponent implements OnInit {

	// @Input() arret: Arret;
	@Input() tempsDattentes : TempsDattente[];

	constructor(
		private route: ActivatedRoute,
		private tempsDattenteService : TempsDattenteService,
		private location: Location
	) { }

	ngOnInit() {
		this.getTempsDattente();
	}

	getTempsDattente(): void {
		const codeLieu = this.route.snapshot.paramMap.get('codeLieu');
		this.tempsDattenteService.getTempsdAttente(codeLieu)
			.subscribe(tempsDattentes => this.tempsDattentes = tempsDattentes);
	}

}