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

    $selected!.addEventListener("click", () => {
      this.classList.toggle("active");
    });

    $options.forEach(($option) => {
      $option.addEventListener("click", () => {
        this.classList.remove("active");
        this.filterByRegion($selected!, $option);
      });
    });
  }

  private async filterByRegion(
    $selected: Element,
    $option: Element
  ): Promise<void> {
    const currentFilter = $selected!.firstElementChild!.innerHTML;
    const selectedFilter = $option.innerHTML;
    $selected!.firstElementChild!.innerHTML = selectedFilter;

    if (currentFilter !== selectedFilter) {
      let countriesFiltered = await this.searchCountriesService.filterByRegion(
        selectedFilter
      );
      const value = this.parentElement?.querySelector("input")?.value;

      if (value) {
        const filteredByName = await this.searchCountriesService.filterByName(
          value,
          countriesFiltered
        );
        countriesFiltered = filteredByName;
      }

      if (!countriesFiltered?.length) {
        const $container = document.querySelector("rca-countries");
        $container!.innerHTML = "";
        $container!.innerHTML =
          "<p class='no-countries'>No Countries Searched</p>";
        return;
      }

      UtilsService.renderCountries(countriesFiltered);
    }
  }
}

customElements.define("rca-menu", MenuComponent);
