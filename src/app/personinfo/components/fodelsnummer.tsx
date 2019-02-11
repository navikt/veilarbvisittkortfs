import * as React from 'react';

function Fodelsnummer(prop: {fnr: string}){
    return <span className="personinfo__fodselsnummer">{prop.fnr}</span>
}

export default Fodelsnummer;