import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Ligne } from './beans/ligne';

@Injectable()
export class LignesService {
  private LignesSource = new BehaviorSubject<Ligne[]>(null);
  currentLignes = this.LignesSource.asObservable();

  constructor() { }

  changeLigne(lignes: Ligne[]) {
    this.LignesSource.next(lignes)
  }
}
