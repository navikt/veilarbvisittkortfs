import React from 'react';
import './tilbakelenke.less';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { useAppStore } from '../../../store/app-store';

function Tilbakelenke() {
    const { enhetId, tilbakeTilFlate } = useAppStore();
    const tilbakeLenke = getTilbakeUrl(tilbakeTilFlate, enhetId);

    return (
        <a className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <ChevronLeftIcon title="tilbakelenke" fontSize="2.8rem" fontWeight="bold" />
        </a>
    );
}

//veilarbpersonflatefs
//veilarbportefoljeflatefs
//arbeidssokerregistrering-fss
function getTilbakeUrl(tilbakeTilFlate: string, enhet?: string): string {
    const enhetParam = enhet ? '?enhet=' + enhet : '';
    if (tilbakeTilFlate === 'veilarbportefoljeflatefs') {
        return `/${tilbakeTilFlate}/tilbake${enhetParam}`;
    } else if (tilbakeTilFlate === '') {
        return `./${enhetParam}`;
    }
    return `/${tilbakeTilFlate}/${enhetParam}`;
}

export default Tilbakelenke;
