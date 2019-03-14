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
        <Lenke className="tilbakelenke" href={tilbakeLenke}>
            <VenstreChevron
                className="tilbakelenke__chevron"
            />
            <span className="tilbakelenke__tekst">Tilbake</span>
        </Lenke>
    );
}

export default Tilbakelenke;
