import ApplicationStorage from "./application-storage";
import { EventBus, EventData, EventType } from "./event-bus";
import { Router } from "./router";

export interface IApplication {
    eventBus: EventBus,
    applicationStorage: ApplicationStorage,
    router: Router
}

/**
 * Базовый класс для компонентов 
 */
export default class AbstractPresenter {

    declare _application: IApplication
    declare _activeInnerPresenter: AbstractPresenter | null;

    constructor(application : IApplication) {
        if (new.target === AbstractPresenter) {
            throw new Error('Нельзя инициализировать базовый класс');
        }
        this._application = application;
        this.init();
        this._activeInnerPresenter = null;
    }

    /**
     * Вызвать событие
     */
    raiseEvent(eventType : EventType, data : EventData) {
        this._application?.eventBus?.raise(eventType, this, data);
    }

    /**
     * Зарегестрировать обработчик
     */
    on(eventType: EventType, callback: (e: Event) => void) {
        this._application?.eventBus?.on(eventType, callback);
    }

    /**
     * Удалить обработчик
     */
    off(eventType: EventType, callback: (e: Event) => void) {
        this._application?.eventBus?.off(eventType, callback);
    }

    /**
     * Заменить активный внутренний презентер
     */
    _replaceInnerPresenter(presenter : AbstractPresenter) {
        this._activeInnerPresenter?.destroy();
        this._activeInnerPresenter = presenter;
        presenter.render();
    }

    /**
     * Метод инициализации
     */
    init() { }

    /**
     * Выполнить отрисовку для презентера
     */
    render() { }

    /**
     * Удалить все дочерние элементы презентера и подписки на события
     */
    destroy() { }
}
