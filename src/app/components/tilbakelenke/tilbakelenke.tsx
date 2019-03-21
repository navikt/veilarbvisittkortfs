import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
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

    return (
        <Lenke className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <VenstreChevron
                className="visittkortfs__tilbakelenke--chevron"
            />
            <span className="visittkortfs__tilbakelenke--tekst">Tilbake</span>
        </Lenke>
    );
}

export default Tilbakelenke;
