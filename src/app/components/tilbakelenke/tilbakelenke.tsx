import * as React from 'react';
import { VenstreChevron } from 'nav-frontend-chevron';
import './tilbakelenke.less';

interface Props {
    enhet?: string;
    fnr: string;
    tilbakeTilFlate: string;
}

function Tilbakelenke(props: Props) {
    const tilbakeLenke =
        props.tilbakeTilFlate === 'veilarbportefoljeflatefs' ? `/${props.tilbakeTilFlate}/tilbake?enhet=${props.enhet}` :
        `/${props.tilbakeTilFlate}/${props.fnr}?enhet=${props.enhet}`;

    const tilbakeTekst =  props.tilbakeTilFlate === 'veilarbportefoljeflatefs' ? 'Oversikten' : 'Aktivitetsplan';

    return (
        <a className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <VenstreChevron
                className="visittkortfs__tilbakelenke--chevron"
            />
            <span className="visittkortfs__tilbakelenke--tekst">{`Til ${tilbakeTekst}`}</span>
        </a>
    );
}

export default Tilbakelenke;
