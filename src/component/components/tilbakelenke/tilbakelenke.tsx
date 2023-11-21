import React from 'react';
import './tilbakelenke.less';
import { useAppStore } from '../../../store/app-store';
import { ChevronLeftCircleIcon, ChevronLeftIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';

function Tilbakelenke() {
    const { enhetId, tilbakeTilFlate } = useAppStore();
    const tilbakeLenke = getTilbakeUrl(tilbakeTilFlate, enhetId);

    return (
        <Link className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <ChevronLeftIcon />
        </Link>
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
