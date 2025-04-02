import { useEffect } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { fetchHarUtkast } from '../../../../api/veilarbvedtaksstotte';
import { fetchHarArenaTiltak } from '../../../../api/veilarbaktivitet';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';

interface Props {
    fnr: string;
    harYtelser?: boolean;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
}

export function AvsluttOppfolgingInfoText({
    fnr,
    harYtelser,
    datoErInnenFor28DagerSiden,
    harUbehandledeDialoger
}: Props) {
    const harArenaTiltakFetcher = useAxiosFetcher(fetchHarArenaTiltak);
    const harUtakstFetcher = useAxiosFetcher(fetchHarUtkast);

    useEffect(() => {
        harUtakstFetcher.fetch(fnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (harArenaTiltakFetcher.loading || harUtakstFetcher.loading) {
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
            {(harUbehandledeDialoger || harArenaTiltak || harYtelser) && (
                <Alert variant="warning" size="small">
                    Du kan avslutte oppfølgingsperioden selv om:
                    <ul className="margin--0">
                        {harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
                        {hentTiltakFeilet && <li>Brukeren kan ha aktive tiltak i Arena</li>}
                        {!hentTiltakFeilet && harArenaTiltak && <li>Brukeren har aktive tiltak i Arena</li>}
                        {harYtelser && <li>Brukeren har aktive saker i Arena</li>}
                    </ul>
                </Alert>
            )}
            {harUtakstFetcher.data && (
                <Alert variant="warning" size="small">
                    Utkast til oppfølgingsvedtak vil bli slettet
                </Alert>
            )}
        </>
    );
}
