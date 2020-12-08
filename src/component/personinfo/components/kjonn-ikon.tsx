import React from 'react';
import KvinneIkon from './kvinne.svg';
import MannIkon from './mann.svg';
import visibleIf from '../../components/visible-if';

function KjonnIkon(props: { kjonn: string }) {
    const erKvinne = props.kjonn.toLowerCase() === 'k';

    const ikon = erKvinne ? KvinneIkon : MannIkon;
    const ikonTekst = `ikon ${erKvinne ? 'kvinne' : 'mann'}`;

    return <img src={ikon} className="personinfo__ikon" alt={ikonTekst} />;
}

export default visibleIf(KjonnIkon);
