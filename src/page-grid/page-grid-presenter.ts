import { render } from '../component-framework/render';
import { NavBarView } from '../nav-bar/nav-bar-view';
import AbstractPresenter, { IApplication } from '../component-framework/abstract-presenter';
import { PageContentView } from '../page-content/page-content-view';

export class PageGridPresenter extends AbstractPresenter {

    _container : HTMLElement;
    _navBarView: NavBarView;
    _contentView: PageContentView;

    constructor(application: IApplication, container : HTMLElement){
        super(application);
        this._container = container;
        this._navBarView = new NavBarView();
        this._contentView = new PageContentView();
    }

    render(): void {
        render(this._container, this._contentView);
        render(this._container, this._navBarView);
    }
}
