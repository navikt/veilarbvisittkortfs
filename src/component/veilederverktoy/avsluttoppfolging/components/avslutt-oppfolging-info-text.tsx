import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { useHarUtkast } from '../../../../api/veilarbvedtaksstotte';

interface Props {
    fnr: string;
    harUbehandledeDialoger: boolean;
}

export function AvsluttOppfolgingInfoText({ fnr, harUbehandledeDialoger }: Props) {
    const { data: harUtkast, isLoading: harUtkastIsLoading } = useHarUtkast(fnr);

    if (harUtkastIsLoading) {
        return <Loader size="2xlarge" />;
    }

    const avslutningstekst =
        'Her avslutter du brukerens oppfølgingsperiode og legger inn en kort begrunnelse om hvorfor.';

    return (
        <>
            <BodyShort size="small" spacing={true}>
                {avslutningstekst}
            </BodyShort>
            {harUbehandledeDialoger && (
                <Alert variant="warning" size="small">
                    Du kan avslutte oppfølgingsperioden selv om:
                    <ul className="margin--0">
                        {harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
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
