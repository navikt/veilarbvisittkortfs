import { Alert, BodyShort } from '@navikt/ds-react';
import { useHarUtkast } from '../../../../api/veilarbvedtaksstotte';

interface Props {
    harUtkast: ReturnType<typeof useHarUtkast>['data'];
    harUbehandledeDialoger: boolean;
}

export function AvsluttOppfolgingInfoText({ harUtkast, harUbehandledeDialoger }: Props) {
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
