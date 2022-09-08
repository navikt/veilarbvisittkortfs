import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Personalia } from '../../../api/veilarbperson';
import { OrNothing } from '../../../util/type/utility-types';

export function kalkulerAlder(fodselsdato: Date): number {
    const diff = Date.now() - fodselsdato.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
}

export function lagAlderTekst(personalia: OrNothing<Personalia>): string {
    if (!personalia || !personalia.fodselsdato) {
        return '';
    }
    const alder = kalkulerAlder(new Date(personalia.fodselsdato));
    return `(${alder} år)`;
}

function NavnOgAlder(props: { personalia: OrNothing<Personalia>; navn: string }) {
    const alderTekst = lagAlderTekst(props.personalia);
    return <Undertittel>{`${props.navn} ${alderTekst}`}</Undertittel>;
}

export default NavnOgAlder;
