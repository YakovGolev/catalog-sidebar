'use strict';

const icons = {
    news: `
        <svg class="button-with-icon__icon" height="20" width="20" viewBox="0 0 20 20">
            <path d="M20 15a3 3 0 1 1-3-3 2.95 2.95 0 0 1 .71.094 7.976 7.976 0 0 0-9.85-9.8L6.84.514A9.983 9.983 0 0 1 20 10a10.1 10.1 0 0 1-.55 3.27A3.024 3.024 0 0 1 20 15zm-3-1a1 1 0 1 0 1 1 1 1 0 0 0-1-1zm-7-8a4 4 0 1 1-4 4 4 4 0 0 1 4-4zm0 6a2 2 0 1 0-2-2 2 2 0 0 0 2 2zM3 8a2.95 2.95 0 0 1-.71-.094 7.976 7.976 0 0 0 9.85 9.8l1.02 1.78A9.983 9.983 0 0 1 0 10a10.1 10.1 0 0 1 .55-3.27A3 3 0 1 1 3 8zm0-4a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"></path>
        </svg>`
}

const menu = {
    items: [
        { 
            type: 'button',
            icon: icons.news,
            text: 'First menu option' 
        },
        
    ]
}
const menuContainer = document.querySelector('.docs-sidebar');
const mainPanel = menuContainer.querySelector('.main-panel');
const button = document.querySelector('.sidebar-button');

function drawMenu(menuObj){
    mainPanel.innerHTML = '';
    menuObj.items.forEach(item => {
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="main-panel__button button-with-icon">
            ${item.icon}
            <div class="button-with-icon__text">${item.text}</div>
        </div>`;
        mainPanel.appendChild(element.children[0]);
    });
}

drawMenu(menu);

button.addEventListener('click', e => {
    if (menuContainer.classList.contains('menu-state--opened')){
        menuContainer.classList.remove('menu-state--opened');
    }
    else{
        menuContainer.classList.add('menu-state--opened');
    }
});