import { CountryPage } from "../pages/country-page/country-page.page";
import { HomePage } from "../pages/home/home.page";

const declarations = [HomePage, CountryPage];

const home = () => document.createElement('rca-home');
const country = (params: string) => {
    const $countryPage = document.createElement('rca-country-page');
    $countryPage.setAttribute('country-code', params);
    return $countryPage
};

export const ROUTES = {
    home,
    country
}