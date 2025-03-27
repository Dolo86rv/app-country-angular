import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  routter = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request }) => {
      if (!request.query) return of([]);

      this.routter.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      })

      //Permite transformar cualquier observable en una promesa
      return this.countryService.searchByCountry(request.query);
    }
  });
  //Resource es una función que recibe un objeto con dos propiedades: request y loader y trabaja con promesas
  /*countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({request }) => {
      if (!request.query) return [];

      //Permite transformar cualquier observable en una promesa
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      )
    }
  });*/
}
