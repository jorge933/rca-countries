import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { MenuComponent } from "../../components/menu/menu.component";
import { CountryComponent } from "../../components/country/country.component";

export class HomePage extends HTMLElement {
    constructor() {
        super()
    }

    private readonly declarations = [SearchBarComponent, MenuComponent, CountryComponent]
    connectedCallback() {
        this.innerHTML = `
        <div class="navigation">
            <rca-search-bar></rca-search-bar>
            <rca-menu></rca-menu>
        </div>
        <div class="countries">
            <rca-country></rca-country>
        </div>
        `;
        
    }
}

customElements.define('rca-home', HomePage);