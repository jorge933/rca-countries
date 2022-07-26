import countryTemplate from "./country.component.html";
import countryStyles from "./country.component.scss";
import { UtilsService } from "../../service/Utils.service";

export class CountryComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const styles = countryStyles;
        const countryInformations = this.getAttribute('country-informations');
        const {flags, name, population, region, capital} = JSON.parse(countryInformations);
        const maskedPopulation = population.toLocaleString()

        this.innerHTML = UtilsService.bindModelToView(countryTemplate, {flag: flags.svg, name: name.common, population: maskedPopulation, region, capital});

        this.removeAttribute('country-informations');
        
    }
}

customElements.define('rca-country', CountryComponent);