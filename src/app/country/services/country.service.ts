import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();


  searchByCapital( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryArrayToCountryArray(resp)),
        tap( countries => this.queryCacheCapital.set(query, countries)),
        catchError((err) => {
          console.error('Error fetching', err);
          return throwError(() => new Error(`No se puso encontrar países con la capital: ${query}`));
        })
      );
    }

  searchByCountry( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query)!);
    }

    console.log(`Llegando al servidor por ${query}`);
    return this.http
      .get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryArrayToCountryArray(resp)),
        tap( countries => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion( region: Region){

    if(this.queryCacheRegion.has(region)){
      return of(this.queryCacheRegion.get(region)!);
    }

    console.log(`Llegando al servidor por ${region}`);
    return this.http
      .get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map((resp) => CountryMapper.mapCountryArrayToCountryArray(resp)),
        tap( countries => this.queryCacheRegion.set(region, countries)),
        catchError((err) => {
          console.error('Error fetching', err);
          return throwError(() => new Error(`No se puso encontrar una región con el nombre: ${region}`));
        })
      );
  }

}
