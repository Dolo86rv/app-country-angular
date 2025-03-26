import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
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
        //delay(3000),
        catchError((err) => {
          console.error('Error fetching', err);
          return throwError(() => new Error(`No se puso encontrar países con la capital: ${query}`));
        })
      );
    }

  searchByCountry( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http
      .get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryArrayToCountryArray(resp)),
        delay(2000),
        catchError((err) => {
          console.error('Error fetching', err);
          return throwError(() => new Error(`No se puso encontrar países con el nombre: ${query}`));
        })
      );
  }

  searchByCountryByAlphaCode( code: string){

    return this.http
      .get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryArrayToCountryArray(resp)),
        map( countries => countries.at(0)),
        catchError((err) => {
          console.error('Error fetching', err);
          return throwError(() => new Error(`No se puso encontrar países con el código: ${code}`));
        })
      );
  }

}
