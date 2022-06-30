import AbstractView from '../component-framework/abstract-view';
import './nav-bar.css';

const createNavBarTemplate = () => `
    <div class="nav-bar">
        <div class="logo-icon">D</div>
        <div class="logo-header">Портал документации</div>
        <input class="search" placeholder="Поиск...">
    </div>`;

export class NavBarView extends AbstractView {
    get template(): string {
        return createNavBarTemplate();
    }
}
