import { IApplication } from './component-framework/abstract-presenter';
import ApplicationStorage from './component-framework/application-storage';
import { EventBus } from './component-framework/event-bus';
import { Router } from './component-framework/router';
import { PageGridPresenter } from './page-grid/page-grid-presenter';
import './styles.css';

(function(){
    const eventBus = new EventBus();
    const app: IApplication = {
        eventBus: eventBus,
        router: new Router(eventBus),
        applicationStorage: new ApplicationStorage()
    };
    const contentContainer = document.querySelector('.page') as HTMLElement;
    if (contentContainer)
        new PageGridPresenter(app, contentContainer).render();
}());
