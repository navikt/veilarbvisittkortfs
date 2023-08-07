import React from 'react';
import './tilbakelenke.less';
import { useAppStore } from '../../../store/app-store';
import { ChevronLeftCircleIcon, ChevronLeftIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';

function Tilbakelenke() {
    const { brukerFnr, enhetId, tilbakeTilFlate } = useAppStore();
    const tilbakeLenke = getTilbakeUrl(tilbakeTilFlate, brukerFnr, enhetId);

    return (
        <Link className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <ChevronLeftIcon />
        </Link>
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
