import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  //Injeccion de las rutas con todas sus propiedades
  activatedRoute = inject(ActivatedRoute);
  routter = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource ({
    request: () => ({ query: this.query() }),
    loader: ({request }) => {
      if (!request.query) return of([]);

      this.routter.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      })
      return this.countryService.searchByCapital(request.query);
    }
  });

  //Resource es una función que recibe un objeto con dos propiedades: request y loader y trabaja con promesas
  /*countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({request }) => {
      if (!request.query) return [];

      //Permite transformar cualquier observable en una promesa
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      )
    }
  });*/

  /****Se puede hacer lo mismo con signals forma tradicional***/
  /*isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string){
    if (this.isLoading()) return

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query)
    .subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      }
    })
  }*/
 }
