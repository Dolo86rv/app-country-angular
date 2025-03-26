import { Country } from '../interfaces/country.interfaces';
import { RESTCountry } from '../interfaces/rest-country.interfaces';

export class CountryMapper {

  static mapRestCountryToCountry( item: RESTCountry): Country{
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      name: item.translations['spa'].common ?? 'No spanish name',
      capital: item.capital.join(', '),
      population: item.population
    }
  }

  static mapCountryArrayToCountryArray(items: RESTCountry[]): Country[] {
    return items.map(this.mapRestCountryToCountry);
  }


}
