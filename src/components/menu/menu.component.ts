import menuTemplate from "./menu.component.html";
import menuStyles from "./menu.component.scss";

export class MenuComponent extends HTMLElement{
    constructor() {
        super()
    }

    connectedCallback() {
        const styles = menuStyles;
        this.innerHTML = menuTemplate;

        const $selected = this.querySelector('.selected');
        const $options = this.querySelectorAll('.option');

        $selected.addEventListener('click', () => {
            const classList = this.classList.value;
            classList.includes('active') ? this.classList.remove('active') : this.classList.add('active');
        })

        $options.forEach($option => {
            $option.addEventListener('click', () => {
                const currentFilter = $selected.firstElementChild.innerHTML;
                const filter = $option.innerHTML;

                if (currentFilter !== filter) {
                    $selected.firstElementChild.innerHTML = filter;
                    this.classList.remove('active');
                }
            })
        })
    }
}

customElements.define('rca-menu', MenuComponent);