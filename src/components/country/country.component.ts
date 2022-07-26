import countryTemplate from "./country.component.html";
import countryStyles from "./country.component.scss";

export class CountryComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const styles = countryStyles;
        this.innerHTML = countryTemplate;
    }
}

customElements.define('rca-country', CountryComponent);