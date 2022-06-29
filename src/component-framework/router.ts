import AbstractPresenter from "./abstract-presenter";
import { EventBus, EventType } from "./event-bus";

export interface IRoute {
    path: string,
    hash: string
}

/**
 * Компонент отвечающий за маршрутизацию по страницам  
 */
export class Router {

    declare _eventBus : EventBus;
    declare _route : IRoute;

    constructor(eventBus: EventBus) {
        this._eventBus = eventBus;
        this._initHistoryNaviration();
    }

    /** 
     * Текущий маршрут в браузере
     */
    get currentWindowRoute(): IRoute {
        return {
            path: window.location.pathname,
            hash: window.location.hash
        }
    }

    /** 
     * Текущий маршрут
     */
    get route() : IRoute {
        return this._route;
    }

    /**
     * Используя History API обновляет URL страницы.
     */
    _updateUrlState(push: boolean) {
        const url = (this._route.path?.indexOf('#') === -1 && this._route.hash)
            ? this._route.path + this._route.hash
            : this._route.path;

        if (push) {
            window.history.pushState({ url: location.href }, document.title, url);
        }
        else {
            window.history.replaceState({ url: location.href }, document.title, url);
        }
    }

    /**
     * Вызов перехода по url
     */
    navigate(caller : AbstractPresenter | null, route : IRoute) {
        const oldRoute = this._route;
        this._route = route;
        this._updateUrlState(true);
        if (oldRoute?.path && oldRoute.path === this._route.path)
            this._eventBus.raise(EventType.HashChanged, caller);
        else
            this._eventBus.raise(EventType.PathChanged, caller);
    }
    /**
     * Вызов перехода по текущему url
     */
    navigateToCurrentWindowRoute(caller: AbstractPresenter) {
        this.navigate(caller, this.currentWindowRoute);
    }

    /**
     * Обработчик нажатия ссылок в презентерах
     */
    innerLinkClickHandler(event : PointerEvent) {
        if (!(event?.target instanceof HTMLAnchorElement) || !event.target.attributes.getNamedItem('href'))
            return;

        event.preventDefault();

        const href = event.target.attributes.getNamedItem('href')?.value;
        
        if(!href) return;

        if (href.startsWith('#')) {
            this.navigate(null, {
                path: this.route.path,
                hash: href
            });
        } else {
            this.navigate(null, {
                path: href,
                hash: ''
            });
        }
    }

    /**
     * Обработка нажатия кнопок веред/назад
     */
    _initHistoryNaviration() {
        window.addEventListener('popstate', () => {
            if (window.history.state === null) {
                // событие сработало не при навигации по кнопкам Вперед/Назад
                return;
            }

            if (this._route.path === window.location.pathname) {
                this._route.hash = window.location.hash;
                this._updateUrlState(false);
                this._eventBus.raise(EventType.HashChanged, null);
            } else {
                this._route = this.currentWindowRoute;
                this._updateUrlState(false);
                this._eventBus.raise(EventType.PathChanged, null);
            }
        });
    }

    _getUrl(url: string) {
        let result = decodeURI(url);
        const pos = result.indexOf('#');

        if (-1 !== pos) {
            result = result.slice(0, pos);
        }

        if (result !== '/') {
            result = result.replace(/\/$/, '');  // удаляем один завершающий '/'
        }

        return result;
    }
}
