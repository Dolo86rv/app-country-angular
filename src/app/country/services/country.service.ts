import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryArrayToCountryArray(resp)),
        catchError((err) => {
          console.error('Error fetching', err);
          return throwError(() => new Error(`No se puso encontrar países con la capital: ${query}`));
        })
      );
    }

}
