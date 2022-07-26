import { HomePage } from "../pages/home/home.page";

const declarations = [HomePage]

const home = () => document.createElement('rca-home');

export const ROUTES = {
    home: home
}