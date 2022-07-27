import { RestCountriesApiService } from "./rest-countries-api.service";
import { Country } from "../models/country.model";

export class SearchCountriesService {
  private restCountriesApiService = new RestCountriesApiService();

  async filterByName(name: string, countries: Country[] = undefined) {
    if (!countries)
      countries = await this.restCountriesApiService.getAllCountries();

    return countries.filter((country) => {
      const countryNameInLowerCase = country.name.common.toLowerCase();
      const searchNameInLowerCase = name;

      if (countryNameInLowerCase.startsWith(searchNameInLowerCase))
        return country;
    });
  }

  async filterByRegion(region: string, countries: Country[] = undefined) {
    if (!countries)
      countries = await this.restCountriesApiService.getAllCountries();

    if (region !== "Filter By Region")
      return countries.filter((country) => country.region === region);
  }
}
