import React from 'react';
import KvinneIkon from './kvinne.svg?react';
import MannIkon from './mann.svg?react';
import visibleIf from '../../components/visible-if';

function KjonnIkon(props: { kjonn: string }) {
    const kjonnLowerCase = props.kjonn.toLowerCase();
    // kan ta bort 'k' og 'm' når vi kun henter personalia fra PDL
    if (kjonnLowerCase === 'k' || kjonnLowerCase === 'kvinne') {
        return <KvinneIkon className="personinfo__ikon" alt={'kvinne'} />;
    } else if (kjonnLowerCase === 'm' || kjonnLowerCase === 'mann') {
        return <MannIkon className="personinfo__ikon" alt={'mann'} />;
    }
    return null;
}

export default visibleIf(KjonnIkon);
