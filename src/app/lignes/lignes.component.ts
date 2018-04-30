import { Component, OnInit, Input } from '@angular/core';
import { Ligne } from '../beans/ligne';
import { LignesService } from '../lignes.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-lignes',
	templateUrl: './lignes.component.html',
	styleUrls: ['./lignes.component.css']
})
export class LignesComponent implements OnInit {
	lignes: Observable<Ligne[]>;

	constructor(private lignesService: LignesService) { }

	ngOnInit() {
		this.lignes = this.lignesService.currentLignes;
	}
}
