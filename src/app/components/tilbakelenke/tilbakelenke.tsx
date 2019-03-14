import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './tilbakelenke.less';

interface Props {
    enhet?: string;
    fnr: string;
}

function Tilbakelenke(props: Props) {
    const tilbakeLenke = props.enhet? `/veilarbportefoljeflatefs/tilbake?enhet=${props.enhet}`:
        `/veilarbpersonflatefs/${props.fnr}`;

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
