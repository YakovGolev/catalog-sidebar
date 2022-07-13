import AbstractPresenter from "./abstract-presenter";

/**
 * Типы событий
 */
export enum EventType {
    HashChanged = 'HashChanged',
    PathChanged = 'PathChanged',
    PresenterRendered = 'PresenterRendered',
    MenuOpened = 'MenuOpened',
    MenuClosed = 'MenuClosed'
};

/**
 * Общая шина событий
 */
export class EventBus {
    /**
     * Зарегестрировать обработчик события
     */
    on(eventType : EventType, eventHandler : (e:Event) => void) {
        document.addEventListener(eventType, eventHandler);
    }

    /**
     * Зарегестрировать обработчик события для разового выполнения
     */
    once(eventType : EventType, eventHandler : (e:Event) => void) {
        document.addEventListener(eventType, eventHandler, { once: true });
    }

    /**
     * Удалить обработчик события
     */
    off(eventType : EventType, eventHandler : (e:Event) => void) {
        document.removeEventListener(eventType, eventHandler);
    }

    /**
     * Вызвать событие
     */
    raise(eventType : EventType, source : AbstractPresenter | null, data : EventData = undefined) {
        document.dispatchEvent(new CustomEvent(eventType, {
            detail: {
                source: source,
                data: data
            }
        }));
    }
}

export interface IEventDetail<T> {
    source: AbstractPresenter | null,
    data: EventData | T
}

export type EventData = {} | string | number | undefined;
