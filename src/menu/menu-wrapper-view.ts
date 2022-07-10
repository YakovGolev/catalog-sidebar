import AbstractView from '../component-framework/abstract-view';
import './menu.css';

const createMenuTemplate = () => `
    <div class="sidebar-wrapper">
        <div class="hover-frame">
            <div class="main-panel">
            </div>
        </div>
        <div class="sidebar-button">
            <svg class="ham hamRotate ham8" viewBox="0 0 100 100" width="60">
                <path
                    class="line top"
                    d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
                <path
                    class="line middle"
                    d="m 30,50 h 40" />
                <path
                    class="line bottom"
                    d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
            </svg>
        </div>
    </div>`;

export class MenuView extends AbstractView {
    get template(): string {
        return createMenuTemplate();
    }
}
