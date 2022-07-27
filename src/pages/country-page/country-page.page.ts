import countryTemplate from "./country-page.page.html";
import countryStyles from "./country-page.page.scss";

export class CountryPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const styles = countryStyles;
        this.innerHTML = countryTemplate;
    }
}

customElements.define('rca-country-page', CountryPage)