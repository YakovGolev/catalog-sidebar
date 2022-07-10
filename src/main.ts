import { IApplication } from './component-framework/abstract-presenter';
import ApplicationStorage from './component-framework/application-storage';
import { EventBus } from './component-framework/event-bus';
import { Router } from './component-framework/router';
import { getMenuFolder } from './mock-data';
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

/* const classes = {
    MENU_OPENED: 'menu-state--opened',
    BUTTON_ACTIVE: 'active'
}

const menuContainer = document.querySelector('.docs-sidebar') ?? document.createElement('div');
const mainPanel = menuContainer.querySelector('.main-panel') ?? document.createElement('div');;
const button = document.querySelector('.sidebar-button') ?? document.createElement('div');;
const menuHamIcon = button?.querySelector('svg') ?? document.createElement('div');;
const pageContent = document.querySelector('.page-content') ?? document.createElement('div');;
const menuBorder = document.querySelector('.hover-frame') ?? document.createElement('div');;
const menuMap = new Map();

function renderMenu(menuObj: any){
    mainPanel.innerHTML = '';
    menuObj.items.forEach((item: any) => {
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="main-panel__button button-with-icon">
            ${item.icon}
            <div class="button-with-icon__text">${item.text}</div>
        </div>`;
        const btn = element.children[0];
        mainPanel.appendChild(btn);
        menuMap.set(btn, item);
        btn.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            selectMenuItem(e.currentTarget as any);
            if (item.type === 'button' || item.type === 'document'){                
                console.log(item.href);
            }
            else if (item.type === 'folder'){
                renderFolder(item);
            }
        });
    });
}

function selectMenuItem(element: HTMLElement){
    document.querySelectorAll('.main-panel__button').forEach(btn => {
        btn.classList.remove(classes.BUTTON_ACTIVE)
    })
    element.classList.add(classes.BUTTON_ACTIVE);
}

function renderFolder(folder: any){
    if (!menuContainer.classList.contains(classes.MENU_OPENED)){
        menuContainer.classList.add(classes.MENU_OPENED);
        pageContent.classList.add(classes.MENU_OPENED);
        menuHamIcon.classList.add(classes.BUTTON_ACTIVE);
        menuBorder.removeEventListener('click', menuClickHandler);
    }
    console.log(folder);
}

function menuClickHandler(){
    if (!menuContainer.classList.contains(classes.MENU_OPENED)){
        menuContainer.classList.add(classes.MENU_OPENED);
        pageContent.classList.add(classes.MENU_OPENED);
        menuHamIcon.classList.add(classes.BUTTON_ACTIVE);
        menuBorder.removeEventListener('click', menuClickHandler);
    }
    else {
        menuContainer.classList.remove(classes.MENU_OPENED);
        pageContent.classList.remove(classes.MENU_OPENED);
        menuHamIcon.classList.remove(classes.BUTTON_ACTIVE);
        menuBorder.addEventListener('click', menuClickHandler);
    }
}

getMenuFolder().then(folder =>{
    renderMenu(folder);
    button.addEventListener('click', menuClickHandler);
    menuBorder.addEventListener('click', menuClickHandler);
}); */
