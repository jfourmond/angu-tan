import { Component, OnInit, Input, HostListener } from '@angular/core';

import * as d3 from 'd3';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Arret } from '../beans/arret';
import { TempsDattente } from '../beans/temps-dattente';
import { TempsDattenteService } from '../temps-dattente.service';
import { Ligne } from '../beans/ligne';
import { ArretService } from '../arret.service';
import { NGSP_UNICODE } from '@angular/compiler';

@Component({
	selector: 'app-temps-dattente',
	templateUrl: './temps-dattente.component.html',
	styleUrls: ['./temps-dattente.component.css']
})
export class TempsDattenteComponent implements OnInit {

	// @Input() arret: Arret;
	private fullTempsDattentes: TempsDattente[];
	tempsDattentes: TempsDattente[];
	lignes: Ligne[];
	selectedLigne: Ligne;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private tempsDattenteService: TempsDattenteService,
		private arretService: ArretService
	) { }

	ngOnInit() {
		this.getLignes();
		this.getTempsDattente();
		setInterval(() => this.getTempsDattente(), 60000);
	}

	getLignes(): void {
		const codeLieu = this.route.snapshot.paramMap.get('codeLieu');
		this.arretService.getArrets()
			.subscribe(arrets => this.lignes = arrets.find(a => a.codeLieu === codeLieu).ligne);
	}

	getTempsDattente(): void {
		const codeLieu = this.route.snapshot.paramMap.get('codeLieu');
		this.tempsDattenteService.getTempsdAttente(codeLieu)
			.subscribe(tempsDattentes => {
				this.fullTempsDattentes = tempsDattentes;
				for (let i in this.fullTempsDattentes)
					this.fullTempsDattentes[i].index = i;
				// Application du filtre si besoin
				if(this.selectedLigne)
					this.tempsDattentes = this.fullTempsDattentes.filter(t => t.ligne.numLigne == this.selectedLigne.numLigne);
				else
					this.tempsDattentes = this.fullTempsDattentes;
			});
	}

	drawLine(tempsDattente): void {
		const tempsStr = tempsDattente.temps;
		let temps = 0;
		if (tempsStr === 'Proche')
			temps = 0.5;
		else {
			let i = tempsStr.indexOf(' ');
			temps = parseInt(tempsStr.substr(0, i));
		}

		const div = d3.select(`#line-${tempsDattente.index}`);

		if (!div.select("svg").empty()) {
			// Like a resize
			const svg = div.select("svg");
			svg.attr("width", div.node().getBoundingClientRect().width)
				.attr("height", div.node().getBoundingClientRect().height / 3);

			const margin = { top: 3, right: 75, bottom: 3, left: 10 };
			const width = parseInt(svg.attr("width")) - margin.left - margin.right;
			const height = parseInt(svg.attr("height")) - margin.top - margin.bottom;

			const midHeight = height / 2;

			const g = svg.select("g");
			g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			const x = d3.scaleLinear()
				.domain([60, 0])
				.range([0, width]);

			const color = d3.scaleSequential(d3.interpolateRgb("black", "lime"))
				.domain([60, 0]);

			// Ligne 
			const line = g.select("line");
			line.attr("x1", x(0))
				.attr("y1", midHeight)
				.attr("x2", x(60))
				.attr("y2", midHeight)
				.attr("stroke-width", 2)
				.attr("stroke", "black");

			// Point
			const circle = g.select("circle")
			circle.attr("cx", x(temps))
				.attr("cy", midHeight)
				.attr("r", 10)
				.attr("stroke", "white")
				.attr("fill", color(temps));

			// Temps restant
			const text = g.select("text");
			text.attr("x", x(0))
				.attr("y", midHeight)
				.attr("dx", 7)
				.attr("dy", 3)
				.attr("text-anchor", "start")
				.text(`${tempsStr}`);

			return;
		} else {
			// New Interface
			const svg = div.append("svg")
				.attr("width", div.node().getBoundingClientRect().width)
				.attr("height", div.node().getBoundingClientRect().height / 3);

			const margin = { top: 3, right: 75, bottom: 3, left: 10 };
			const width = parseInt(svg.attr("width")) - margin.left - margin.right;
			const height = parseInt(svg.attr("height")) - margin.top - margin.bottom;

			const midHeight = height / 2;

			const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

			const x = d3.scaleLinear()
				.domain([60, 0])
				.range([0, width]);

			const color = d3.scaleSequential(d3.interpolateRgb("black", "lime"))
				.domain([60, 0]);

			// Ligne 
			const line = g.append("line")
				.attr("x1", x(0))
				.attr("y1", midHeight)
				.attr("x2", x(60))
				.attr("y2", midHeight)
				.attr("stroke-width", 2)
				.attr("stroke", "black");

			// Point
			const circle = g.append("circle")
				.attr("cx", x(temps))
				.attr("cy", midHeight)
				.attr("r", 10)
				.attr("stroke", "white")
				.attr("fill", color(temps));

			// Temps restant
			const text = g.append("text")
				.attr("x", x(0))
				.attr("y", midHeight)
				.attr("dx", 7)
				.attr("dy", 3)
				.attr("text-anchor", "start")
				.text(`${tempsStr}`);
		}
	}

	onSelect(ligne: Ligne): void {
		if (this.selectedLigne === ligne) {
			this.selectedLigne = null;
			this.tempsDattentes = this.fullTempsDattentes;
		} else {
			this.selectedLigne = ligne;
			this.tempsDattentes = this.fullTempsDattentes.filter(t => t.ligne.numLigne === this.selectedLigne.numLigne);
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.tempsDattentes.map(t => this.drawLine(t));
	}
}