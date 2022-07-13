import AbstractView from '../component-framework/abstract-view';
import './menu-button.css';

const createMenuButtonTemplate = () => `
    <div class="sidebar-button">
        <svg class="ham hamRotate ham8" viewBox="0 0 100 100" width="60">
            <path
                class="line top"
                d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
            <path
                class="line middle"
                d="m 30,50 h 40" />
            <path
                class="line bottom"
                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
        </svg>
    </div>`;

export class MenuButtonView extends AbstractView {

    get template(): string {
        return createMenuButtonTemplate();
    }

    registerHandlers(menuClickHandler: (e: Event) => void){
        this._handlerLinks.set('menuClickHandler', menuClickHandler);
        this.element?.addEventListener('click', menuClickHandler);
    }

    removeHandlers() {
        const menuClickHandler = this._handlerLinks.get('menuClickHandler');
        if (menuClickHandler)
            this.element?.removeEventListener('click', menuClickHandler);
        this._handlerLinks.delete('menuClickHandler');
    }

    setActive(){
        this._svg?.classList.add('active');
    }

    setDefault(){
        this._svg?.classList.remove('active');
    }

    get _svg(){
        return this.element.querySelector('svg');
    }
}
