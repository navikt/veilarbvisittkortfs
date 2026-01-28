import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.less?inline';
import visittkortLessStyles from './index.less?inline';
import visittkortCssStyles from './index.css?inline';
import sijStyles from './component/components/sokfilter/sok-filter.less?inline';
import kopierStyles from './component/components/kopier-knapp/kopier-knapp.less?inline';
import radioStyles from './component/components/radiofilterform/radio-filterform.less?inline';
import varselModalStyles from './component/components/varselmodal/varsel-modal.less?inline';
import tilbakelenkeStyles from './component/components/tilbakelenke/tilbakelenke.less?inline';
import lasterModalStyles from './component/components/lastermodal/laster-modal.less?inline';
import formikStyles from './component/components/formik/formik.less?inline';
import huskelappPostitstylingStyles from './component/huskelapp/huskelapp-postitstyling.less?inline';
import huskelappRedigeringStyles from './component/huskelapp/redigering/huskelapp-redigering.less?inline';
import dataFetcherStyles from './component/data-fetcher.less?inline';
import personinfoStyles from './component/personinfo/personinfo.less?inline';
import etiketterStyles from './component/personinfo/components/etiketter.less?inline';
import tildelVeilederStyles from './component/veilederverktoy/tildel-veileder/tildel-veileder.less?inline';
import begrunnelseFormStyles from './component/veilederverktoy/begrunnelseform/begrunnelse-form.less?inline';
import historikkStyles from './component/veilederverktoy/historikk/historikk.less?inline';
import stoppEskaleringStyles from './component/veilederverktoy/stopp-eskalering/stopp-eskalering.less?inline';
import veilederverktoyStyles from './component/veilederverktoy/veilederverktoy.less?inline';
import selectMedSokStyles from './component/veilederverktoy/opprett-oppgave/components/select-med-sok/select-med-sok.less?inline';
import opprettOppgaveStyles from './component/veilederverktoy/opprett-oppgave/opprett-oppgave.less?inline';

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
                    <style>
                        {visittkortCssStyles +
                            visittkortLessStyles +
                            sijStyles +
                            kopierStyles +
                            radioStyles +
                            varselModalStyles +
                            tilbakelenkeStyles +
                            lasterModalStyles +
                            formikStyles +
                            huskelappPostitstylingStyles +
                            huskelappRedigeringStyles +
                            dataFetcherStyles +
                            personinfoStyles +
                            etiketterStyles +
                            tildelVeilederStyles +
                            begrunnelseFormStyles +
                            historikkStyles +
                            stoppEskaleringStyles +
                            veilederverktoyStyles +
                            selectMedSokStyles +
                            opprettOppgaveStyles}
                    </style>
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
