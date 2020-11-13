import * as React from 'react';
import './tilbakelenke.less';
import Chevron from 'nav-frontend-chevron';
import { useAppStore } from '../../../store-midlertidig/app-store';

function Tilbakelenke() {
    const { brukerFnr, enhetId, tilbakeTilFlate } = useAppStore();
    const tilbakeLenke =
        tilbakeTilFlate === 'veilarbportefoljeflatefs'
            ? `/${tilbakeTilFlate}/tilbake?enhet=${enhetId}`
            : `/${tilbakeTilFlate}/${brukerFnr}?enhet=${enhetId}`;

    return (
        <a className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <Chevron stor={true} type="venstre" />
        </a>
    );
}

export default Tilbakelenke;
