import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ligne } from '../beans/ligne';
import { ArretService } from '../arret.service';

@Component({
	selector: 'app-lignes',
	templateUrl: './lignes.component.html',
	styleUrls: ['./lignes.component.css']
})
export class LignesComponent implements OnInit {
	private codeLieu: string;
	@Input() lignes: Ligne[];

	constructor(
		private route: ActivatedRoute,
		private arretService: ArretService
	) { }

	ngOnInit() {
		this.getLignes();
	}

	getLignes() {
		const codeLieu = this.route.snapshot.paramMap.get('codeLieu');
		this.arretService.getArrets()
			.subscribe(arrets => {
				console.log(arrets.find(a => a.codeLieu === codeLieu));
				this.lignes = arrets.find(a => a.codeLieu === codeLieu).ligne
				console.log(this.lignes);
			});
	}
}
