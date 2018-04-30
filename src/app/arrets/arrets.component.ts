import { Component, OnInit } from '@angular/core';

import { Arret } from '../beans/arret';
import { ArretService } from '../arret.service';
import { LignesService } from '../lignes.service';

@Component({
	selector: 'app-arrets',
	templateUrl: './arrets.component.html',
	styleUrls: ['./arrets.component.css']
})
export class ArretsComponent implements OnInit {
	private fullArrets: Arret[];

	arrets: Arret[];

	constructor(
		private arretService: ArretService,
		private lignesService: LignesService
	) { }

	ngOnInit() {
		this.getArrets();
	}

	getArrets() {
		this.arretService.getArrets()
			.subscribe(arrets => {
				this.fullArrets = arrets;
				this.arrets = this.fullArrets;
			});
	}

	// Push a search term into the observable stream.
	search(term: string): void {
		if(!term.trim())
			this.arrets = this.fullArrets;
		term = term.trim();
		this.arrets = this.fullArrets.filter(a => a.libelle.toLowerCase().includes(term.toLowerCase()));
	}

	sendLignes(arret: Arret) {
		this.lignesService.changeLigne(arret.ligne);
	}
}
