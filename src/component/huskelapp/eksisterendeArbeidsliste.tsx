import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { Arbeidsliste } from '../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../util/date-utils';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const EksisterendeArbeidsliste = ({ arbeidsliste }: Props) => {
    return (
        <div>
            <Heading size={'small'} as="h2">
                Eksisterende arbeidslisteinnhold
            </Heading>
            <Alert variant="info" className="huskelapp-alert" size={'small'}>
                Når du <b>lagrer</b> huskelapp første gang vil eksisterende arbeidslisteinnhold på personen automatisk
                slettes. Alt eksisterende arbeidslisteinnhold blir slettet <b>2. januar 2024.</b>
            </Alert>
            <BodyShort className="blokk-xxs" weight={'semibold'} size={'small'}>
                {arbeidsliste?.overskrift}
            </BodyShort>
            <BodyShort className="blokk-xxs font-xs" size={'small'}>
                <i>Arbeidsliste frist: {toSimpleDateStr(arbeidsliste?.frist ?? new Date())}</i>
            </BodyShort>
            <BodyLong size={'small'} className="blokk-xxs font-xs">
                {arbeidsliste?.kommentar}
            </BodyLong>
            <BodyShort size={'small'} className="blokk-xxs font-xs">
                <i>
                    Oppdatert {toSimpleDateStr(arbeidsliste?.endringstidspunkt ?? new Date())} av{' '}
                    {arbeidsliste?.sistEndretAv?.veilederId}
                </i>
            </BodyShort>
        </div>
    );
};
