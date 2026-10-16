import { CopyButton, Heading } from '@navikt/ds-react';

export function kalkulerAlder(fodselsdato: Date): number {
    const iDag = new Date();
    const alder = iDag.getFullYear() - fodselsdato.getFullYear();
    const maned = iDag.getMonth() - fodselsdato.getMonth();
    if (maned < 0 || (maned === 0 && iDag.getDate() < fodselsdato.getDate())) {
        return alder - 1;
    }
    return alder;
}

function NavnOgAlder({
    fodselsdato,
    navn,
    brukerFnr
}: {
    fodselsdato: string | undefined;
    navn: string;
    brukerFnr: string;
}) {
    const alder = fodselsdato ? kalkulerAlder(new Date(fodselsdato)) : '';
    return (
        <div className="personinfo__navn-og-alder ml-2 flex flex-col items-start">
            <Heading size="xsmall" level="2" className="[padding-inline-start:var(--ax-space-12)]">
                {`${navn} (${alder} år)`}
            </Heading>
            <CopyButton
                aria-label="Kopier fødselsnummer"
                className="shrink-0 whitespace-nowrap"
                copyText={brukerFnr}
                text={`F.nr.: ${brukerFnr}`}
                activeText="Kopiert!"
                size="small"
                iconPosition="right"
            />
        </div>
    );
}

export default NavnOgAlder;
