import newsIcon from './icons/news.svg';
import glossaryIcon from './icons/glossary.svg';
import folderIcon from './icons/folder.svg';
import documentIcon from './icons/document.svg';

export enum MenuItemType {
    item = 'item',
    folder = 'folder'
}

export interface IMenuItem {
    type: MenuItemType,
    id: number | undefined,
    icon: string,
    text: string,
    href: string
}
export interface IMenuFolder {
    parent: IMenuItem | null,
    items: IMenuItem[]
}

export function getMenuFolder(id?: string) : Promise<IMenuFolder> {
    return new Promise((resolve,reject) => {
        const folder = _map.get(id ?? '#');
        if (folder)
            setTimeout(() => resolve(folder), 1000);
        else
            reject('Not found');
    });
}


const menu = {
    parent: null,
    items: [
        {
            id: undefined,
            type: MenuItemType.item,
            icon: newsIcon,
            text: 'Новости',
            href: '/'
        },
        {
            id: undefined,
            type: MenuItemType.item,
            icon: glossaryIcon,
            text: 'Глоссарий',
            href: '/glossary'
        },
        {
            id: 1,
            type: MenuItemType.folder,
            icon: folderIcon,
            text: 'Каталог статей',
            href: '/articles'
        }
    ]
}
const folder1 = {
    parent: {
        id: 1,
        type: MenuItemType.folder,
        icon: folderIcon,
        text: 'Каталог статей',
        href: '/articles'
    },
    items: [
        {
            id: 2,
            type: MenuItemType.folder,
            icon: folderIcon,
            text: 'Новая папка 1',
            href: '/2'
        },
        {
            id: undefined,
            type: MenuItemType.item,
            icon: documentIcon,
            text: 'Статья 1',
            href: '/123'
        },
        {
            id: undefined,
            type: MenuItemType.item,
            icon: documentIcon,
            text: 'Статья 2. Эта статья с достаточно длинным названием для проверки переноса строк',
            href: '/321'
        },
        {
            id: undefined,
            type: MenuItemType.item,
            icon: documentIcon,
            text: 'Статья 3',
            href: '/3221'
        }

    ]
};

const folder2 = {
    parent: {
        id: 1,
        type: MenuItemType.folder,
        icon: folderIcon,
        text: 'Каталог статей',
        href: '/articles'
    },
    items: [
        {
            id: undefined,
            type: MenuItemType.item,
            icon: documentIcon,
            text: 'Статья 3',
            href: '/456'
        },
        {
            id: undefined,
            type: MenuItemType.item,
            icon: documentIcon,
            text: 'Статья 4',
            href: '/789'
        }
    ]
};

const _map = new Map<string, IMenuFolder>();
_map.set('#', menu);
_map.set('/articles', folder1);
_map.set('/2', folder2);
