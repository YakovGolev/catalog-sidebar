import { render } from '../component-framework/render';
import AbstractPresenter, { IApplication } from '../component-framework/abstract-presenter';
import { MenuView } from './menu-wrapper-view';
import { EventType } from '../component-framework/event-bus';
import { IRoute } from '../component-framework/router';
import { getMenuFolder } from '../mock-data';

export class MenuPresenter extends AbstractPresenter {

    _container : HTMLElement;
    _wrapperView = new MenuView();
    _pathChangeHandler_bind: (() => void ) | null = null;
    _route: IRoute | null = null;

    constructor(application: IApplication, container : HTMLElement){
        super(application);
        this._container = container;         
    }

    render(): void {
        render(this._container, this._wrapperView);
        this._initHandlers();
        this._pathChangeHandler();
    }

    _initHandlers() {
        this._pathChangeHandler_bind = this._pathChangeHandler.bind(this);
        this.on(EventType.PathChanged, this._pathChangeHandler_bind);
    }

    _pathChangeHandler() {
        const route = this._application.router.route;
        if (this._route && this._route.path === route.path)
            return;

        this._route = route;
        const data = getMenuFolder();

    }
}
