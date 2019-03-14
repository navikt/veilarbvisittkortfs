import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './tilbakelenke.less';

interface Props {
    enhet?: string;
}

function Tilbakelenke(props: Props) {
    return (
        <Lenke className="visittkortfs__tilbakelenke" href={`/veilarbportefoljeflatefs/tilbake?enhet=${props.enhet}`}>
            <VenstreChevron
                className="visittkortfs__tilbakelenke--chevron"
            />
            <span className="visittkortfs__tilbakelenke--tekst">Tilbake</span>
        </Lenke>
    );
}

export default Tilbakelenke;
