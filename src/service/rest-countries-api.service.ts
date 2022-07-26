import { StorageService } from "./storage.service";

export class RestCountriesApiService {
    async getAllCountries() {
        const countriesInStorage = StorageService.getItem('countries');
        
        if (!countriesInStorage) {
            const countries = await fetch('https://restcountries.com/v3.1/all');
            const countriesArray = await countries.json();
            const countriesStringify = JSON.stringify(countriesArray);
            
            StorageService.setItem('countries', countriesStringify);
            return countriesArray;
        }

        const countriesArray = JSON.parse(countriesInStorage);
        return countriesArray;
    }
}