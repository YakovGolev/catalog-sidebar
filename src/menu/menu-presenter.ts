import AbstractPresenter, { IApplication } from '../component-framework/abstract-presenter';

export class MenuPresenter extends AbstractPresenter {

    _container : HTMLElement;

    constructor(application: IApplication, container : HTMLElement){
        super(application);
        this._container = container;
    }

    render(): void {
        
    }
}
