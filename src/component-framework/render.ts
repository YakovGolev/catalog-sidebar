import AbstractView from "./abstract-view";

/**
 * Позиция отрисовки
 */
export enum RenderPosition {
    BEFORE_BEGIN = 'beforebegin',
    AFTER_BEGIN = 'afterbegin',
    BEFORE_END = 'beforeend',
    AFTER_END = 'afterend',
};

/**
 * Функция отрисовки компонента
 */
export function render(container : HTMLElement, view : AbstractView, renderPosition : RenderPosition = RenderPosition.BEFORE_END) {
    container.insertAdjacentElement(renderPosition, view.element);
}
