import * as React from 'react';
import './tilbakelenke.less';
import Chevron from 'nav-frontend-chevron';

interface Props {
    enhet?: string;
    fnr: string;
    tilbakeTilFlate: string;
}

function Tilbakelenke(props: Props) {
    const tilbakeLenke =
        props.tilbakeTilFlate === 'veilarbportefoljeflatefs'
            ? `/${props.tilbakeTilFlate}/tilbake?enhet=${props.enhet}`
            : `/${props.tilbakeTilFlate}/${props.fnr}?enhet=${props.enhet}`;

    return (
        <a className="visittkortfs__tilbakelenke" href={tilbakeLenke}>
            <Chevron stor={true} type="venstre" />
        </a>
    );
}

export default Tilbakelenke;
