import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function Fodselsnummer(prop: { fnr: string }) {
    return <Normaltekst tag="span">{prop.fnr}</Normaltekst>;
}

export default Fodselsnummer;
