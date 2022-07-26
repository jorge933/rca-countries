import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

export class HomePage extends HTMLElement {
    constructor() {
        super()
    }

    private readonly declarations = [SearchBarComponent]
    connectedCallback() {
        this.innerHTML = `
        <div class="navigation">
            <rca-search-bar></rca-search-bar>
        </div>
        `;
        
    }
}

customElements.define('rca-home', HomePage);