import React from 'react';
import {
    FigureInwardFillIcon, FigureOutwardFillIcon
} from '@navikt/aksel-icons';
import visibleIf from '../../components/visible-if';

function KjonnIkon(props: { kjonn: string }) {
    const kjonnLowerCase = props.kjonn.toLowerCase();
    // kan ta bort 'k' og 'm' når vi kun henter personalia fra PDL
    if (kjonnLowerCase === 'k' || kjonnLowerCase === 'kvinne') {
        return <FigureOutwardFillIcon title="kvinne" className="personinfo__ikon" color="darkred" alt={'kvinne'}/>

    } else if (kjonnLowerCase === 'm' || kjonnLowerCase === 'mann') {
        return <FigureInwardFillIcon title="mann" className="personinfo__ikon" color="darkblue" alt={'mann'} />;
    }
    return null;
}

export default visibleIf(KjonnIkon);
