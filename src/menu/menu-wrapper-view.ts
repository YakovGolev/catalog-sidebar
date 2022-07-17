import { MENU_OPENED } from '../constants';
import AbstractView from '../component-framework/abstract-view';
import './menu.css';

const createMenuTemplate = () => `
    <div class="sidebar-wrapper">
        <div class="hover-frame">
            <div class="main-panel"></div>
            <div class="folder-panel"></div>
        </div>
    </div>`;

export class MenuWrapperView extends AbstractView {

    get template(): string {
        return createMenuTemplate();
    }

    get isOpened(){
        return this.element.classList.contains(MENU_OPENED);
    }

    registerHandlers(menuClickHandler: (e: Event) => void){
        this._handlerLinks.set('menuClickHandler', menuClickHandler);
        this.hoverFrame?.addEventListener('click', menuClickHandler);
    }

    removeHandlers() {
        const menuClickHandler = this._handlerLinks.get('menuClickHandler');
        if (menuClickHandler)
            this.hoverFrame?.removeEventListener('click', menuClickHandler);
        this._handlerLinks.delete('menuClickHandler');
    }

    openMenu(){
        this.element.classList.add(MENU_OPENED);
        this.hoverFrame?.classList.add(MENU_OPENED);
    }

    closeMenu(){
        this.element.classList.remove(MENU_OPENED);
        this.hoverFrame?.classList.remove(MENU_OPENED);
    }

    openFolder(){
        this.folderPanel?.classList.add('opened');
    }

    closeFolder(){
        this.folderPanel?.classList.remove('opened');
    }


    get hoverFrame() {
        return this.element.querySelector('.hover-frame');
    }

    get mainPanel() {
        return this.element.querySelector('.main-panel');
    }

    get folderPanel() {
        return this.element.querySelector('.folder-panel');
    }

}
