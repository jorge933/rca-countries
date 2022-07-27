import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { MenuComponent } from "../../components/menu/menu.component";
import { CountryComponent } from "../../components/country/country.component";

import homeStyles from "./home.page.scss";
import { RestCountriesApiService } from "../../service/rest-countries-api.service";
import { UtilsService } from "../../service/Utils.service";

export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  private readonly declarations = [
    SearchBarComponent,
    MenuComponent,
    CountryComponent,
  ];
  private restCountriesApiService = new RestCountriesApiService();
  connectedCallback() {
    const styles = homeStyles;
    this.innerHTML = `
        <div class="navigation">
            <rca-search-bar></rca-search-bar>
            <rca-menu></rca-menu>
        </div>
        <rca-countries></rca-countries>
        `;

    this.restCountriesApiService.getAllCountries().then((countries) => {
      UtilsService.renderCountries(countries);
    });
  }
}

customElements.define("rca-home", HomePage);
