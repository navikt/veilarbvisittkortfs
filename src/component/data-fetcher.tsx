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
                    <Heading size="small" level="2">
                        <Skeleton variant="text" width="12rem" />
                    </Heading>
                    <div className="verktoylinje">
                        <div className="verktoylinje__ikonplass" />
                        <span className="verktoylinje__lastverdi">
                            <Label as="span">
                                F.nr.: <Skeleton as="span" variant="text" width="6rem" />
                            </Label>
                            <span className="verktoylinje__kopiikonplass" />
                        </span>
                        <Label>/</Label>
                        <span className="verktoylinje__lastverdi">
                            <Label as="span">
                                Tlf.: <Skeleton as="span" variant="text" width="6rem" />
                            </Label>
                            <span className="verktoylinje__kopiikonplass" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!brukerFnr) return null;
    return <>{children(brukerFnr)}</>;
}
