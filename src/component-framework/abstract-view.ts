/**
 * Базовый класс для визульного представления 
 */
export default class AbstractView {

    declare _element : HTMLElement | null;
    declare _handlerLinks : Map<string, (e:Event) => void>;

    constructor() {
        if (new.target === AbstractView) {
            throw new Error('Нельзя инициализировать базовый класс');
        }
        this._element = null;
        this._handlerLinks = new Map();
    }

    /**
     * Шаблон представления
     */
    get template() : string {
        throw new Error('Не переопределен абстрактный метод: get template()');
    }

    /**
     * HTML элемент, связанный с представлением
     */
    get element() : HTMLElement {
        if (!this._element)
            this._element = this._createElement();

        return this._element;
    }

    removeElement() {
        this.removeHandlers();
        this._element?.remove();
        this._element = null;
    }

    show() {
        this.element.removeAttribute('style');
    }

    hide() {
        this.element.setAttribute('style', 'display: none');
    }

    /** 
     * Удалить обаботчики
     * (вызывается в базовой реализации метода removeElement) 
     */
    removeHandlers() { }

    /**
     * Создать HTML элемент по шаблону
     */
    _createElement() : HTMLElement {
        const tempWrapper = document.createElement('DIV');
        tempWrapper.innerHTML = this.template;

        return tempWrapper.children[0] as HTMLElement;
    }
}
