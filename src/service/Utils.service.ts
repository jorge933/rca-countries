import { Country } from "../models/country.model";

export class UtilsService {
  static bindModelToView(template: string, object: Object) {
    const objectEntries = Object.entries(object);

    const newTemplate = objectEntries.reduce((template, [key, value]) => {
      const regex = new RegExp(`{{ *${key}* }}`, "g");
      const newTemplate = template.replace(regex, value ?? "");
      return newTemplate;
    }, template);

    return newTemplate;
  }

  static renderCountries(countries: Country[]) {
    const $container = document.querySelector("rca-countries");
    $container.innerHTML = "";

    countries.forEach((country) => {
      const $country = document.createElement("rca-country");
      const countryStringify = JSON.stringify(country);
      $country.setAttribute("country-informations", countryStringify);

      $container.appendChild($country);
    });
  }
}
