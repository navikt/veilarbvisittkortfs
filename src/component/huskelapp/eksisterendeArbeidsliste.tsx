import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react';
import { trackAmplitude } from '../../amplitude/amplitude';
import { ExternalLink } from '@navikt/ds-icons';
import * as React from 'react';
import { useDataStore } from '../../store/data-store';
import { Arbeidsliste } from '../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../util/date-utils';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const EksisterendeArbeidsliste = ({ arbeidsliste }: Props) => {
    return (
        <div>
            <Heading size={'medium'} as="h2">
                Eksisterende arbeidslisteinnhold
            </Heading>
            <Alert variant="info" className="huskelapp-alert" size="small">
                Når du <b>lagrer</b> huskelapp første gang vil eksisterende arbeidslisteinnhold på personen automatisk
                slettes. Alt eksisterende arbeidslisteinnhold blir slettet <b>2. januar 2024.</b>
            </Alert>
            <BodyShort className="blokk-xs" weight={'semibold'}>
                {arbeidsliste?.overskrift}
            </BodyShort>
            <BodyShort className="blokk-xs">
                <i>Arbeidsliste frist {toSimpleDateStr(arbeidsliste?.frist ?? new Date())}</i>
            </BodyShort>
            <BodyShort className="blokk-xs">{arbeidsliste?.kommentar}</BodyShort>
            <BodyShort className="blokk-xs">
                <i>
                    Oppdatert {toSimpleDateStr(arbeidsliste?.endringstidspunkt ?? new Date())} av{' '}
                    {arbeidsliste?.sistEndretAv?.veilederId}
                </i>
            </BodyShort>
        </div>
    );
};
