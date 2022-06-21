import React from 'react';
import './tilbakelenke.less';
import Chevron from 'nav-frontend-chevron';
import { useAppStore } from '../../../store/app-store';

function Tilbakelenke() {
    const { brukerFnr, enhetId, tilbakeTilFlate } = useAppStore();
    const tilbakeLenke = getTilbakeUrl(tilbakeTilFlate, brukerFnr, enhetId);

    return (
        <a className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <Chevron stor={true} type="venstre" />
        </a>
    );
}

function getTilbakeUrl(tilbakeTilFlate: string, brukerFnr: string, enhet?: string): string {
    const enhetParam = enhet ? '?enhet=' + enhet : '';
    if (tilbakeTilFlate === 'veilarbportefoljeflatefs') {
        return `/${tilbakeTilFlate}/tilbake${enhetParam}`;
    } else if (tilbakeTilFlate === '') {
        return `./${brukerFnr}${enhetParam}`;
    }
    return `/${tilbakeTilFlate}/${brukerFnr}${enhetParam}`;
}

export default Tilbakelenke;
