import { render } from '../component-framework/render';
import { NavBarView } from '../nav-bar/nav-bar-view';
import AbstractPresenter, { IApplication } from '../component-framework/abstract-presenter';
import { PageContentView } from '../page-content/page-content-view';
import { MenuPresenter } from '../menu/menu-presenter';
import { EventType } from '../component-framework/event-bus';

export class PageGridPresenter extends AbstractPresenter {

    _container : HTMLElement;
    _navBarView: NavBarView;
    _contentView: PageContentView;
    _menu: MenuPresenter;

    constructor(application: IApplication, container : HTMLElement){
        super(application);
        this._container = container;
        this._navBarView = new NavBarView();
        this._contentView = new PageContentView();
        this._menu = new MenuPresenter(this._application, this._container);
    }

    render() {
        render(this._container, this._contentView);
        render(this._container, this._navBarView);
        this._menu.render();

        this._initHandlers();
    }

    _initHandlers(){
        this.on(EventType.MenuOpened, () => {
            this._contentView.setNarrow();
        });
        this.on(EventType.MenuClosed, () => {
            this._contentView.setWide();
        });
    }
}
