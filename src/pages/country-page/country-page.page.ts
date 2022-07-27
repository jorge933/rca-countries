import { RestCountriesApiService } from "../../service/rest-countries-api.service";
import { UtilsService } from "../../service/Utils.service";
import countryTemplate from "./country-page.page.html";
import countryStyles from "./country-page.page.scss";
import { Currency, NativeName } from "../../models/country.model";

export class CountryPage extends HTMLElement {
  private restCountriesApiService = new RestCountriesApiService();
  constructor() {
    super();
  }

  async connectedCallback() {
    const styles = countryStyles;

    const countryCode = this.getAttribute("country-code");

    const country = await this.restCountriesApiService.getCountry(countryCode);
    console.log(country);
    const {
      flags,
      name,
      population,
      region,
      subregion,
      capital,
      flag,
      currencies,
      languages,
      borders,
    } = country[0];
    const maskedPopulation = population.toLocaleString();
    const allLangs = Object.values(languages).join(", ");
    const currency: Currency[] = Object.values(currencies);
    const nativeName: NativeName[] = Object.values(name.nativeName);

    this.removeAttribute("country-code");
    this.innerHTML = UtilsService.bindModelToView(countryTemplate, {
      flag: flags.svg,
      topLevelDomain: flag,
      name: name.common,
      maskedPopulation,
      nativeName: nativeName[0].common,
      region,
      subregion,
      capital,
      currency: currency[0].name,
      allLangs,
    });
    this.borderCountries(borders);
  }

  borderCountries(borders: string[]) {
    const $borders = document.querySelector(".border-countries");
    borders.forEach((border) => ($borders.innerHTML += `<div>${border}</div>`));
  }
}

customElements.define("rca-country-page", CountryPage);
