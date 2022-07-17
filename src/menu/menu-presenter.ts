import { render, RenderPosition } from '../component-framework/render';
import AbstractPresenter, { IApplication } from '../component-framework/abstract-presenter';
import { MenuWrapperView } from './menu-wrapper-view';
import { EventType } from '../component-framework/event-bus';
import { IRoute } from '../component-framework/router';
import { getMenuFolder, IMenuFolder, IMenuItem, MenuItemType } from '../mock-data';
import { MenuButtonView } from './menu-button-view';
import { MenuItemView } from './menu-item-view';

export class MenuPresenter extends AbstractPresenter {

    _container : HTMLElement;
    _wrapperView = new MenuWrapperView();
    _menuButton = new MenuButtonView();
    _pathChangeHandler_bind?: (() => void );
    _route?: IRoute;
    _buttonsMap = new Map<HTMLElement, IMenuItem>();

    constructor(application: IApplication, container : HTMLElement){
        super(application);
        this._container = container;         
    }

    render(): void {
        render(this._container, this._wrapperView);
        render(this._wrapperView.element, this._menuButton, RenderPosition.BEFORE_END);
        this._initHandlers();
        this._navigateToCurrentRoute();
    }

    _initHandlers() {
        this._menuButton.registerHandlers(this._toggleMenuStateHandler.bind(this));
        this._wrapperView.registerHandlers(this._toggleMenuStateHandler.bind(this));
    }

    _toggleMenuStateHandler(e: Event){
        if (this._wrapperView.isOpened && e.currentTarget !== this._wrapperView.hoverFrame){
            this._wrapperView.closeMenu();
            this._menuButton.setDefault();
            this.raiseEvent(EventType.MenuClosed, undefined);
        }
        else {
            this._menuButton.setActive();
            this._wrapperView.openMenu();
            this.raiseEvent(EventType.MenuOpened, undefined);
        }
    }

    _navigateToCurrentRoute() {
        const route = this._application.router.route;
        if (this._route)
            return;

        this._route = route;
        getMenuFolder().then(folder => this._renderRootFolder(folder));
        getMenuFolder(route.path).then(folder => this._renderMenuFolder(folder));
    }

    _renderMenuFolder(folder: IMenuFolder){
        const folderPanel = this._wrapperView.folderPanel as HTMLElement;
        if (folderPanel){
            folder.items.forEach((item: IMenuItem) => {
                const view = new MenuItemView(item);
                this._buttonsMap.set(view.element, item);
                view.initHandlers(this._menuItemClickHandler.bind(this));
                render(folderPanel, view);
            });
            this._wrapperView.openFolder();
        }
    }

    _renderRootFolder(folder: IMenuFolder){
        const mainPanel = this._wrapperView.mainPanel as HTMLElement;
        if (mainPanel){
            folder.items.forEach((item: IMenuItem) => {
                const view = new MenuItemView(item);
                this._buttonsMap.set(view.element, item);
                view.initHandlers(this._menuItemClickHandler.bind(this));
                render(mainPanel, view);
            });
        }
    }

    _menuItemClickHandler(e: Event){
        const button = e.currentTarget as HTMLElement;
        if (button){
            const item = this._buttonsMap.get(button);
            console.log(item);
            if (item?.type === MenuItemType.folder){
                getMenuFolder(item.href).then(folder => this._renderMenuFolder(folder))
            }
            else {
                this._application.router.navigate(this, {
                    path: item?.href ?? '',
                    hash: ''
                });    
            }
        }
    }
}
