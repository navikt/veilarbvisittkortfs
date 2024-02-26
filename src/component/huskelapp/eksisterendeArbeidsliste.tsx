import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { Arbeidsliste } from '../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../util/date-utils';
import './huskelapp.less';
import { SlettArbeidsliste } from './redigering/huskelapp-slett-arbeidsliste';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const EksisterendeArbeidsliste = ({ arbeidsliste }: Props) => {
    return (
        <div className="arbeidslisteInnhold">
            <Heading size="small" as="h2">
                Eksisterende arbeidslisteinnhold
            </Heading>
            <Alert variant="info" className="huskelapp-alert" size="small">
                Når du <b>lagrer</b> huskelapp første gang vil eksisterende arbeidslisteinnhold på personen automatisk
                slettes. Alt eksisterende arbeidslisteinnhold blir slettet <b>{'< en dato for sletting >'}</b>
            </Alert>
            <BodyShort className="margin-bottom-xxs" weight={'semibold'} size="small">
                {arbeidsliste?.overskrift}
            </BodyShort>
            <BodyShort className="margin-bottom-xxs font-xs" size="small">
                <i>Arbeidsliste frist: {toSimpleDateStr(arbeidsliste?.frist ?? 'Ingen frist satt')}</i>
            </BodyShort>
            <BodyLong size="small" className="margin-bottom-xxs font-xs">
                {arbeidsliste?.kommentar}
            </BodyLong>
            <BodyShort size="small" className="margin-bottom-xxs font-xs">
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
