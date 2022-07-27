import { SearchCountriesService } from "../../service/search-countries.service";
import { UtilsService } from "../../service/Utils.service";
import searchBarTemplate from "./search-bar.component.html";
import searchBarStyles from "./search-bar.component.scss";

export class SearchBarComponent extends HTMLElement {
    private searchCountriesService = new SearchCountriesService();
    constructor() {
        super();
        this.filterByName = this.filterByName.bind(this)
    }

    connectedCallback() {
        const styles = searchBarStyles;
        this.innerHTML = searchBarTemplate;

        const $input = this.querySelector('input');

        $input.addEventListener('input', event => {
            this.filterByName(event);
        })
    }

    private async filterByName(event: Event) {
        const filter = document.querySelector('.selected span').innerHTML;
        const target = event.target as HTMLTextAreaElement
        const value = target.value.toLowerCase();

        let filteredByName = await this.searchCountriesService.filterByName(value);
        
        if (filter !== "Filter By Region") {
            const countriesFiltered = await this.searchCountriesService.filterByRegion(filter, filteredByName);
            console.log(countriesFiltered);
            
            filteredByName = countriesFiltered;
            console.log(filteredByName);
            
        }
        

        UtilsService.renderCountries(filteredByName);
    }
}

customElements.define("rca-search-bar", SearchBarComponent);