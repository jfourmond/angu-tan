import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Arret } from './beans/arret';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ArretService {

	private arretsURL = 'http://open_preprod.tan.fr/ewp/arrets.json';

	constructor(private http: HttpClient) { }

	private log(message: string) {
		console.log('ArretService: ' + message);
	}

	getArrets(): Observable<Arret[]> {
		return this.http.get<Arret[]>(this.arretsURL)
			.pipe(
				tap(arrets => this.log(`Arrêts récupérés`)),
				catchError(this.handleError('getArrets', []))
			);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
