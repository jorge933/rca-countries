import { StorageService } from "./storage.service";
import { Country } from "../models/country.model";

export class RestCountriesApiService {
    async getAllCountries() : Promise<Country[]> {
        const countriesInStorage = StorageService.getItem('countries');
        
        if (!countriesInStorage) {
            const countries = await fetch('https://restcountries.com/v3.1/all');
            const countriesArray = await countries.json();
            const countriesStringify = JSON.stringify(countriesArray);
      
            StorageService.setItem('countries', countriesStringify);
            return countriesArray;
        }

        const countriesArray = await JSON.parse(countriesInStorage);
        return countriesArray;
    }

    async getCountry(countryCode) : Promise<Country> {
        const countryInStorage = StorageService.getItem(countryCode);

        if (!countryInStorage) {
            const country = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const countryArray = await country.json();
            const countryStringify = JSON.stringify(countryArray);
            StorageService.setItem(countryCode, countryStringify);
            return countryArray;
        }

        const countryArray = await JSON.parse(countryInStorage);
        return countryArray;
    }
}