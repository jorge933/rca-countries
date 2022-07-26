import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { MenuComponent } from "../../components/menu/menu.component";

export class HomePage extends HTMLElement {
    constructor() {
        super()
    }

    private readonly declarations = [SearchBarComponent, MenuComponent]
    connectedCallback() {
        this.innerHTML = `
        <div class="navigation">
            <rca-search-bar></rca-search-bar>
            <rca-menu></rca-menu>
        </div>
        `;
        
    }
}

customElements.define('rca-home', HomePage);