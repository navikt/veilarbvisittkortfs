import React from 'react';
import { Personalia } from '../../../types/personalia';
import { Systemtittel } from 'nav-frontend-typografi';

export function kalkulerAlder(fodselsdato: Date): number {
    const diff = Date.now() - fodselsdato.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
}

export function lagAlderTekst(personalia: Personalia): string {
    if (personalia.dodsdato) {
        return '(DØD)';
    }
    const alder = kalkulerAlder(new Date(personalia.fodselsdato));
    return `${alder} år`;
}

function NavnOgAlder(props: { personalia: Personalia }) {
    const navn = props.personalia.sammensattNavn;
    const alderTekst = lagAlderTekst(props.personalia);

    return (
        <>
            <Systemtittel className="personinfo__navn_og_alder">
                {`${navn} ${alderTekst}`}
            </Systemtittel>
        </>
    );
}


// <span className="personinfo__alder">{aldersvisning}</span>

export default NavnOgAlder;
