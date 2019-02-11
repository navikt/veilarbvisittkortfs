import React from 'react';
import {Personalia} from "../../../types/personalia";

export function kalkulerAlder(fodselsdato: Date): number {
    const diff = Date.now() - fodselsdato.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
}


export function finnAldersTekst(personalia: Personalia): string {
    if(personalia.dodsdato){
        return '(DØD)'
    }
    const alder = kalkulerAlder(new Date(personalia.fodselsdato));
    return `${alder} år`;
}


function NavnOgAlder(prop: { personalia: Personalia }){
    const aldersvisning = finnAldersTekst(prop.personalia);

    return <h1 className="personinfo__navnogalder typo-systemtittel">
        {prop.personalia.sammensattNavn}
        <span className="personinfo__alder">{aldersvisning}</span>
    </h1>
}


export default NavnOgAlder;