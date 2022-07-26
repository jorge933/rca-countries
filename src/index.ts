const $main = document.querySelector("#root");
import { ROUTES } from "./constants/routes";

class SinglePageApplication {
  constructor() {
    this.renderPage();
    this.hashListener();
    this.windowLoadListener();
  }

  getTargetRoute(hash: string) {
    const hashIsEmpty = hash === "";
    return hashIsEmpty ? "home" : hash.replace("#", "");
  }

  renderPage() {
    $main.innerHTML = '';
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const [fragment, param] = targetRoute.split('/');
    const hasParam = !!param;
    const page = hasParam ? ROUTES[fragment](param) : ROUTES[fragment]();
    $main.appendChild(page);
  }

  hashListener() {
    window.addEventListener("hashchange", this.renderPage);
  }

  windowLoadListener() {
    window.addEventListener('load', () => {
      this.renderPage();
      this.hashListener();
    })
  }
}

const spa = new SinglePageApplication();