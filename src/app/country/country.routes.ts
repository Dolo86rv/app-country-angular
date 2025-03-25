import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';
import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

export const countryRoutes: Routes = [

  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      }
    ]
  },
  /*{
    path: 'country',

  },
  {
    path: '**',
    redirectTo: '',
  }*/
];

export default countryRoutes;
