import { Country } from "models/country.model";
import { SearchCountriesService } from "../../service/search-countries.service";
import { UtilsService } from "../../service/Utils.service";
import searchBarTemplate from "./search-bar.component.html";
import searchBarStyles from "./search-bar.component.scss";

export class SearchBarComponent extends HTMLElement {
  private searchCountriesService = new SearchCountriesService();
  constructor() {
    super();
    this.filterByName = this.filterByName.bind(this);
  }

  connectedCallback() {
    const styles = searchBarStyles;
    this.innerHTML = searchBarTemplate;

    const $input = this.querySelector("input");

    $input!.addEventListener("input", (event) => {
      this.filterByName(event);
    });
  }

  private async filterByName(event: Event): Promise<void> {
    const filter = document.querySelector(".selected span")?.innerHTML;
    const target = event.target as HTMLTextAreaElement;
    const value = target.value.toLowerCase();

    let filteredByName: Country[] | undefined =
      await this.searchCountriesService.filterByName(value);

    if (filter !== "Filter By Region") {
      const countriesFiltered =
        await this.searchCountriesService.filterByRegion(
          filter!,
          filteredByName
        );

      filteredByName = countriesFiltered;
    }

    if (!filteredByName!.length) {
      const $container = document.querySelector("rca-countries");
      $container!.innerHTML = "";
      $container!.innerHTML =
        "<p class='no-countries'>No Countries Searched</p>";
      return;
    }

    UtilsService.renderCountries(filteredByName);
  }
}

customElements.define("rca-search-bar", SearchBarComponent);
