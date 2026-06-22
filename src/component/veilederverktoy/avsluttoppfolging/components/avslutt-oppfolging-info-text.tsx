import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { useHarUtkast } from '../../../../api/veilarbvedtaksstotte';
import { fetchHarArenaTiltak } from '../../../../api/veilarbaktivitet';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';

interface Props {
    fnr: string;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
}

export function AvsluttOppfolgingInfoText({ fnr, datoErInnenFor28DagerSiden, harUbehandledeDialoger }: Props) {
    const harArenaTiltakFetcher = useAxiosFetcher(fetchHarArenaTiltak);
    const { data: harUtkast, isLoading: harUtkastIsLoading } = useHarUtkast(fnr);

    if (harArenaTiltakFetcher.loading || harUtkastIsLoading) {
        return <Loader size="2xlarge" />;
    }

    const harArenaTiltak = harArenaTiltakFetcher.data;
    const hentTiltakFeilet = !!harArenaTiltakFetcher.error;

    const aktivMindreEnn28Dager = datoErInnenFor28DagerSiden
        ? 'Brukeren har vært inaktiv i mindre enn 28 dager. Vil du likevel avslutte brukerens oppfølgingsperiode?'
        : 'Her avslutter du brukerens oppfølgingsperioden og legger inn en kort begrunnelse om hvorfor.';

    return (
        <>
            <BodyShort size="small" spacing={true}>
                {aktivMindreEnn28Dager}
            </BodyShort>
            {(harUbehandledeDialoger || harArenaTiltak) && (
                <Alert variant="warning" size="small">
                    Du kan avslutte oppfølgingsperioden selv om:
                    <ul className="margin--0">
                        {harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
                        {hentTiltakFeilet && <li>Brukeren kan ha aktive tiltak i Arena</li>}
                        {!hentTiltakFeilet && harArenaTiltak && <li>Brukeren har aktive tiltak i Arena</li>}
                    </ul>
                </Alert>
            )}
            {harUtkast?.data && (
                <Alert variant="warning" size="small">
                    Utkast til oppfølgingsvedtak vil bli slettet
                </Alert>
            )}
        </>
    );
}
