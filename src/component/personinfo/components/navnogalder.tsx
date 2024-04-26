import { Personalia } from '../../../api/veilarbperson';
import { OrNothing } from '../../../util/type/utility-types';
import { Heading } from '@navikt/ds-react';

export function kalkulerAlder(fodselsdato: Date): number {
    const iDag = new Date();
    const alder = iDag.getFullYear() - fodselsdato.getFullYear();
    const maned = iDag.getMonth() - fodselsdato.getMonth();
    if (maned < 0 || (maned === 0 && iDag.getDate() < fodselsdato.getDate())) {
        return alder - 1;
    }
    return alder;
}

export function lagAlderTekst(personalia: OrNothing<Personalia>): string {
    if (!personalia || !personalia.fodselsdato) {
        return '';
    }
    const alder = kalkulerAlder(new Date(personalia.fodselsdato));
    return `(${alder} år)`;
}

function NavnOgAlder(props: { personalia: OrNothing<Personalia>; navn: string }) {
    const alderTekst = lagAlderTekst(props.personalia);
    return <Heading size="small" level="2">{`${props.navn} ${alderTekst}`}</Heading>;
}

export default NavnOgAlder;
