import searchBarTemplate from "./search-bar.component.html";
import searchBarStyles from "./search-bar.component.scss";

export class SearchBarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const styles = searchBarStyles;
        this.innerHTML = searchBarTemplate;
    }
}

customElements.define("rca-search-bar", SearchBarComponent);