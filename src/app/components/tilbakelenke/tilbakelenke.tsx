import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './tilbakelenke.less';

interface Props {
    enhet?: string;
}

function Tilbakelenke(props: Props) {
    return (
        <Lenke className="tilbakelenke" href={`/veilarbportefoljeflatefs/tilbake?enhet=${props.enhet}`}>
            <VenstreChevron/>
            <span>Tilbake</span>
        </Lenke>
    );
}

export default Tilbakelenke;
