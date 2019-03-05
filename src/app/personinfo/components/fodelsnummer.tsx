import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function Fodelsnummer(prop: {fnr: string}) {
    return <Normaltekst className="personinfo__fodselsnummer" tag="span">{prop.fnr}</Normaltekst>;
}

export default Fodelsnummer;
