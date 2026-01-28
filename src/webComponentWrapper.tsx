import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.less?inline';
import visittkortLessStyles from './index.less?inline';
import visittkortCssStyles from './index.css?inline';

class VisittkortElement extends HTMLElement {
    private root: ReactDOM.Root | null = null;
    private mountPoint: HTMLDivElement | null = null;

    static get observedAttributes() {
        return ['fnr', 'enhet'];
    }

    connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        this.root = ReactDOM.createRoot(this.mountPoint);
        this.render();
    }

    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
        if (this.mountPoint) {
            this.mountPoint.remove();
            this.mountPoint = null;
        }
    }

    attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    private render() {
        if (!this.root) return;

        const fnr = this.getAttribute('fnr') || '';
        const enhet = this.getAttribute('enhet') || '';
        const tilbakeTilFlate = this.getAttribute('tilbakeTilFlate') || '';
        const visVeilederVerktoy = this.getAttribute('visVeilederVerktoy') === 'true';
        const skjulEtiketter = this.getAttribute('skjulEtiketter') === 'true';

        this.root.render(
            <React.StrictMode>
                <template
                    className="flex"
                    {...{
                        shadowrootmode: 'closed'
                    }}
                >
                    <style>{visittkortCssStyles + visittkortLessStyles}</style>
                    <App
                        fnr={fnr}
                        enhet={enhet}
                        tilbakeTilFlate={tilbakeTilFlate}
                        skjulEtiketter={skjulEtiketter}
                        visVeilederVerktoy={visVeilederVerktoy}
                    />
                </template>
            </React.StrictMode>
        );
    }
}

export const exposeVisittkortAsWebComponent = () => {
    if (!customElements.get('ao-visittkort')) {
        customElements.define('ao-visittkort', VisittkortElement);
    }
};
