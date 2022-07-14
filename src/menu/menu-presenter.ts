import { render, RenderPosition } from '../component-framework/render';
import AbstractPresenter, { IApplication } from '../component-framework/abstract-presenter';
import { MenuWrapperView } from './menu-wrapper-view';
import { EventType } from '../component-framework/event-bus';
import { IRoute } from '../component-framework/router';
import { getMenuFolder, IMenuFolder } from '../mock-data';
import { MenuButtonView } from './menu-button-view';

export class MenuPresenter extends AbstractPresenter {

    _container : HTMLElement;
    _wrapperView = new MenuWrapperView();
    _menuButton = new MenuButtonView();
    _pathChangeHandler_bind: (() => void ) | null = null;
    _route: IRoute | null = null;

    constructor(application: IApplication, container : HTMLElement){
        super(application);
        this._container = container;         
    }

    render(): void {
        render(this._container, this._wrapperView);
        render(this._wrapperView.element, this._menuButton, RenderPosition.BEFORE_END);
        this._initHandlers();
        this._pathChangeHandler();
    }

    _initHandlers() {
        this._pathChangeHandler_bind = this._pathChangeHandler.bind(this);
        this.on(EventType.PathChanged, this._pathChangeHandler_bind);
        this._menuButton.registerHandlers(this._toggleMenuStateHandler.bind(this));
        this._wrapperView.registerHandlers(this._toggleMenuStateHandler.bind(this));
    }

    _toggleMenuStateHandler(e: Event){
        console.log(e);
        if (this._wrapperView.isOpened && e.currentTarget !== this._wrapperView.hoverFrame){
            this._wrapperView.close();
            this._menuButton.setDefault();
            this.raiseEvent(EventType.MenuClosed, undefined);
        }
        else {
            this._menuButton.setActive();
            this._wrapperView.open();
            this.raiseEvent(EventType.MenuOpened, undefined);
        }
    }

    _pathChangeHandler() {
        const route = this._application.router.route;
        if (this._route && this._route.path === route.path)
            return;

        this._route = route;
        getMenuFolder(route.path).then(folder => this._renderMenuFolder(folder));

    }

    _renderMenuFolder(folder: IMenuFolder){
        if (folder.parent == null){
            this._renderRootFolder(folder);
            return;
        }

    }

    _renderRootFolder(folder: IMenuFolder){
        const mainPanel = this._wrapperView?.mainPanel;
        if (mainPanel){
            mainPanel.innerHTML = '';
            folder.items.forEach((item: any) => {
                const element = document.createElement('div');
                element.innerHTML = `
                <div class="main-panel__button button-with-icon">
                    ${item.icon}
                    <div class="button-with-icon__text">${item.text}</div>
                </div>`;
                const btn = element.children[0];
                mainPanel.appendChild(btn);
            });
        }    

    }
}
