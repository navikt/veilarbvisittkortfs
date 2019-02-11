import React from 'react';
import KvinneIkon from './kvinne.svg';
import MannIkon from './mann.svg';

function Icon (prop: {kjonn: string}){
    const ikon = prop.kjonn === "K" ? KvinneIkon : MannIkon;
    const ikonTekst = `ikon ${prop.kjonn === 'K' ? 'kvinne' : 'mann'}`;

    return <img src={ikon} className="personinfo__ikon" alt={ikonTekst}/>
}


export default Icon;