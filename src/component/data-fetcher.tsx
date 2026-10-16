import React from 'react';
import { Heading, Label, Skeleton } from '@navikt/ds-react';
import { useBrukerFnr } from '../store/app-store';
import { useOppfolgingsstatus } from '../api/veilarboppfolging';
import { usePersonalia, useVerge, useFullmakt, useSpraakTolk } from '../api/veilarbperson';
import { useInnloggetVeileder, useVeilederePaEnhet } from '../api/veilarbveileder';
import { useGjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { useVisVeilederVerktøy } from '../store/visittkort-config';

interface Props {
    children: (brukerFnr: string) => React.ReactNode;
}

export function DataFetcher({ children }: Props) {
    const brukerFnr = useBrukerFnr();
    const visVeilederVerktoy = useVisVeilederVerktøy();

    // Start henting av data
    const { oppfolging, isLoading: oppfolgingsstatusIsLoading } = useOppfolgingsstatus(brukerFnr);
    const { isLoading: personaliaIsLoading } = usePersonalia(brukerFnr);
    const { isLoading: innloggetVeilederIsLoading } = useInnloggetVeileder();
    useVerge(brukerFnr);
    useFullmakt(brukerFnr);
    useSpraakTolk(brukerFnr);

    const oppfolgingsEnhet = oppfolging?.oppfolgingsenhet.enhetId || undefined;

    // Bare hent disse hvis visVeilederVerktoy er konfigurert til true
    useVeilederePaEnhet(visVeilederVerktoy ? oppfolgingsEnhet : undefined);
    useGjeldendeEskaleringsvarsel(visVeilederVerktoy ? brukerFnr : undefined);

    if (
        innloggetVeilederIsLoading ||
        oppfolgingsstatusIsLoading ||
        personaliaIsLoading
        // trenger ikke vente på vergeOgFullmaktFetcher eller spraakTolkFetcher
    ) {
        return (
            <div className="visittkortfs__container" role="status" aria-label="Laster personopplysninger">
                <div className="personinfo" aria-hidden="true">
                    <Skeleton variant="circle" width="2rem" height="2rem" className="personinfo__ikon" />
                    <Heading size="small" level="2" className="basis-64 shrink-0">
                        <Skeleton variant="text" width="100%" />
                    </Heading>
                    <div className="verktoylinje">
                        <div className="flex w-[calc(6rem+var(--ax-space-4))] shrink-0 items-center gap-[var(--ax-space-4)]" />
                        <span className="inline-flex items-center gap-[var(--ax-space-6)] [padding-block:var(--ax-space-4)] [padding-inline:var(--ax-space-12)]">
                            <Label as="span" size="small">
                                F.nr.: <Skeleton as="span" variant="text" width="6rem" />
                            </Label>
                            <span className="w-[calc(1.5rem-var(--ax-space-2))] shrink-0" />
                        </span>
                        <Label>/</Label>
                        <span className="inline-flex items-center gap-[var(--ax-space-6)] [padding-block:var(--ax-space-4)] [padding-inline:var(--ax-space-12)]">
                            <Label as="span" size="small">
                                Tlf.: <Skeleton as="span" variant="text" width="6rem" />
                            </Label>
                            <span className="w-[calc(1.5rem-var(--ax-space-2))] shrink-0" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!brukerFnr) return null;
    return <>{children(brukerFnr)}</>;
}
