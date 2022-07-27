import { SearchCountriesService } from "../../service/search-countries.service";
import { UtilsService } from "../../service/Utils.service";
import menuTemplate from "./menu.component.html";
import menuStyles from "./menu.component.scss";

export class MenuComponent extends HTMLElement {
  constructor() {
    super();
  }
  private searchCountriesService = new SearchCountriesService();
  connectedCallback() {
    const styles = menuStyles;
    this.innerHTML = menuTemplate;

    const $selected = this.querySelector(".selected");
    const $options = this.querySelectorAll(".option");

    $selected.addEventListener("click", () => {
      const classList = this.classList.value;
      classList.includes("active")
        ? this.classList.remove("active")
        : this.classList.add("active");
    });

    $options.forEach(($option) => {
      $option.addEventListener("click", () => {
        this.classList.remove("active");
        this.filterByRegion($selected, $option);
      });
    });
  }

  private async filterByRegion($selected, $option) {
    const currentFilter = $selected.firstElementChild.innerHTML;
    const filter = $option.innerHTML;
    $selected.firstElementChild.innerHTML = filter;

    if (currentFilter !== filter) {
      let countriesFiltered = await this.searchCountriesService.filterByRegion(
        filter
      );
      const inputValue = this.parentElement.querySelector("input").value;

      if (inputValue) {
        const filteredByName = await this.searchCountriesService.filterByName(
          inputValue,
          countriesFiltered
        );
        countriesFiltered = filteredByName;
      }

      UtilsService.renderCountries(countriesFiltered);
    }
  }
}

customElements.define("rca-menu", MenuComponent);
