import React from 'react';
import { Personalia } from '../../../types/personalia';
import { Systemtittel } from 'nav-frontend-typografi';

export function kalkulerAlder(fodselsdato: Date): number {
    const diff = Date.now() - fodselsdato.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
}

export function lagAlderTekst(personalia: Personalia): string {
    if (!personalia.fodselsdato) {
        return '';
    }
    const alder = kalkulerAlder(new Date(personalia.fodselsdato));
    return `(${alder} år)`;
}

function NavnOgAlder(props: { personalia: Personalia; navn: string }) {
    const alderTekst = lagAlderTekst(props.personalia);

    return (
        <>
            <Systemtittel className="personinfo__navn_og_alder">{`${props.navn} ${alderTekst}`}</Systemtittel>
        </>
    );
}

export default NavnOgAlder;
