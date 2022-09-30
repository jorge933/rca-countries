const $main = document.querySelector("#root");
const $changeTheme = document.querySelector(".modes");
const $body = document.body;
import { ROUTES } from "./constants/routes";
import { StorageService } from "./service/storage.service";
class SinglePageApplication {
  currentMode: string | null;
  constructor() {
    this.currentMode = StorageService.getItem("mode") || "light";
    this.renderPage = this.renderPage.bind(this);
    this.renderPage();
    this.hashListener();
    this.windowLoadListener();
    this.initTheme();
  }

  getTargetRoute(hash: string) {
    const hashIsEmpty = hash === "";
    return hashIsEmpty ? "home" : hash.replace("#", "");
  }

  renderPage() {
    $main.innerHTML = "";
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const [fragment, param] = targetRoute.split("/");
    const hasParam = !!param;
    const page = hasParam ? ROUTES[fragment](param) : ROUTES[fragment]();
    $main.appendChild(page);
  }

  hashListener() {
    window.addEventListener("hashchange", this.renderPage);
  }

  windowLoadListener() {
    window.addEventListener("load", () => {
      this.renderPage();
      this.hashListener();
    });
  }
  changeTheme() {
    if (this.currentMode === undefined) {
      this.currentMode = StorageService.getItem("mode");
    }

    $body.classList.toggle("dark");
    const newTheme = this.currentMode === "light" ? "dark" : "light";
    const classIcon = newTheme === "light" ? "sun" : "moon";

    console.log(this.currentMode);

    $changeTheme!.innerHTML = `
    <i class="fa-solid fa-${classIcon}"></i>
    <span>${newTheme} mode</span>
    `;
    this.currentMode = newTheme;
    StorageService.setItem("mode", newTheme);
  }

  initTheme() {
    if (this.currentMode === "dark") {
      $body.classList.add("dark");
    }
    const classIcon = this.currentMode === "light" ? "sun" : "moon";

    $changeTheme!.innerHTML = `
    <i class="fa-solid fa-${classIcon}"></i>
    <span>${this.currentMode} mode</span>
    `;

    StorageService.setItem("mode", this.currentMode!);
  }
}

const spa = new SinglePageApplication();
