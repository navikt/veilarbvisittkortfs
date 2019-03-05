import * as React from 'react';
import { Element } from 'nav-frontend-typografi';

function Fodelsnummer(prop: {fnr: string}) {
    return <Element className="personinfo__fodselsnummer" tag="h3">{prop.fnr}</Element>;
}

export default Fodelsnummer;
