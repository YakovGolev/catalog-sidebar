import { IMenuItem } from "mock-data";
import AbstractView from "../component-framework/abstract-view";

const createItemTemplate = (item : IMenuItem) => `
    <div class="main-panel__button button-with-icon">
        ${item.icon}
        <div class="button-with-icon__text">${item.text}</div>
    </div>`;

export class MenuItemView extends AbstractView {

    _item : IMenuItem;

    constructor(item: IMenuItem){
        super();
        this._item = item;
    }

    get template(): string {
        return createItemTemplate(this._item);
    }

    initHandlers(clickHandler: (e: Event) => void) {
        this._handlerLinks.set('click', clickHandler);
        this.element.addEventListener('click', clickHandler);
    }

    removeHandlers() {
        const click = this._handlerLinks.get('click');
        if (click){
            this.element.removeEventListener('click', click);
            this._handlerLinks.delete('click');
        }
    }
}