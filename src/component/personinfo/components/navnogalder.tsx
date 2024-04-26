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

function NavnOgAlder({ fodselsdato, navn }: { fodselsdato: string | undefined; navn: string }) {
    const alder = fodselsdato ? kalkulerAlder(new Date(fodselsdato)) : '';
    return <Heading size="small" level="2">{`${navn} (${alder} år)`}</Heading>;
}

export default NavnOgAlder;
