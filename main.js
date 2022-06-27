'use strict';

const classes = {
    MENU_OPENED: 'menu-state--opened',
    BUTTON_ACTIVE: 'active'
}

const icons = {
    news: `
        <svg class="button-with-icon__icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 5L20 19L4 19L4 5H20M20 3H4C2.89 3 2 3.89 2 5V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V5C22 3.89 21.11 3 20 3M18 15H6V17H18V15M10 7H6V13H10V7M12 9H18V7H12V9M18 11H12V13H18V11Z" />
        </svg>`,
    glossary: `
        <svg class="button-with-icon__icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />
        </svg>`,
    folder: `
        <svg class="button-with-icon__icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" />
        </svg>`,
    document: `
        <svg class="button-with-icon__icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
        </svg>`
}

const menu = {
    items: [
        {
            type: 'button',
            icon: icons.news,
            text: 'Новости',
            href: '/'
        },
        {
            type: 'button',
            icon: icons.glossary,
            text: 'Глоссарий',
            href: '/glossary'
        },
        {
            type: 'folder',
            icon: icons.folder,
            text: 'Каталог статей',
            href: '/articles'
        },

    ]
}
const folder1 = {
    parent: {
        type: 'folder',
        icon: icons.folder,
        text: 'Каталог статей',
        href: '/articles'
    },
    items: [
        {
            type: 'folder',
            icon: icons.folder,
            text: 'Новая папка 1',
            href: '/1'
        },
        {
            type: 'document',
            icon: icons.document,
            text: 'Статья 1',
            href: '/123'
        },
        {
            type: 'document',
            icon: icons.document,
            text: 'Статья 2',
            href: '/321'
        }
    ]
};
const folder2 = {
    parent: {
        type: 'folder',
        icon: icons.folder,
        text: 'Новая папка 1',
        href: '/1'
    },
    items: [
        {
            type: 'document',
            icon: icons.document,
            text: 'Статья 3',
            href: '/456'
        },
        {
            type: 'document',
            icon: icons.document,
            text: 'Статья 4',
            href: '/789'
        }
    ]
};





const menuContainer = document.querySelector('.docs-sidebar');
const mainPanel = menuContainer.querySelector('.main-panel');
const button = document.querySelector('.sidebar-button');
const menuHamIcon = button.querySelector('svg');
const pageContent = document.querySelector('.page-content');
const menuBorder = document.querySelector('.hover-frame');
const menuMap = new Map();

function renderMenu(menuObj){
    mainPanel.innerHTML = '';
    menuObj.items.forEach(item => {
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
            selectMenuItem(e.currentTarget);
            if (item.type === 'button' || item.type === 'document'){                
                console.log(item.href);
            }
            else if (item.type === 'folder'){
                renderFolder(item);
            }
        });
    });
}

function selectMenuItem(element){
    document.querySelectorAll('.main-panel__button').forEach(btn => {
        btn.classList.remove(classes.BUTTON_ACTIVE)
    })
    element.classList.add(classes.BUTTON_ACTIVE);
}

function renderFolder(folder){
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

renderMenu(menu);
button.addEventListener('click', menuClickHandler);
menuBorder.addEventListener('click', menuClickHandler);
