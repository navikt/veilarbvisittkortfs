import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../../util/date-utils';
import './huskelapp-redigering.less';
import { SlettArbeidsliste } from './huskelapp-slett-arbeidsliste';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const EksisterendeArbeidsliste = ({ arbeidsliste }: Props) => {
    return (
        <div className="arbeidsliste-innhold">
            <Heading level="2" size="small">
                Eksisterende arbeidslisteinnhold
            </Heading>
            <Alert variant="info" size="small">
                Når du <b>lagrer</b> huskelapp første gang vil eksisterende arbeidslisteinnhold på personen automatisk
                slettes. Alt eksisterende arbeidslisteinnhold blir slettet <b>{'< en dato for sletting >'}</b>
            </Alert>
            <Heading level="3" size="xsmall">
                {arbeidsliste?.overskrift}
            </Heading>
            <BodyShort size="small">
                <i>Arbeidsliste frist: {toSimpleDateStr(arbeidsliste?.frist ?? 'Ingen frist satt')}</i>
            </BodyShort>
            <BodyLong size="small">{arbeidsliste?.kommentar}</BodyLong>
            <BodyShort size="small">
                <i>
                    {`Oppdatert ${
                        arbeidsliste?.endringstidspunkt ? toSimpleDateStr(arbeidsliste.endringstidspunkt) : 'ukjent'
                    }`}
                    {arbeidsliste?.sistEndretAv?.veilederId && ` av ${arbeidsliste.sistEndretAv.veilederId}`}
                </i>
            </BodyShort>
            <SlettArbeidsliste />
        </div>
    );
};
