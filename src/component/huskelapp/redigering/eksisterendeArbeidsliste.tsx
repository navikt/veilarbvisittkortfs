import { Alert, BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';
import { Arbeidsliste } from '../../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../../util/date-utils';
import '../huskelapp.less';
import { TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { SlettEksisterendeArbeidslisteInnholdVarselModal } from '../SlettEksisterendeArbeidslisteInnholdVarselModal';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
}

export const EksisterendeArbeidsliste = ({ arbeidsliste }: Props) => {
    const [isSlettmodalOpen, setIsSlettmodalOpen] = useState(false);
    return (
        <div className="arbeidsliste-innhold">
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
            <Button
                onClick={() => setIsSlettmodalOpen(true)}
                size="xsmall"
                variant="tertiary"
                icon={<TrashIcon aria-hidden />}
            >
                Slett
            </Button>
            <SlettEksisterendeArbeidslisteInnholdVarselModal
                onCloseRequest={() => setIsSlettmodalOpen(false)}
                isOpen={isSlettmodalOpen}
            />
        </div>
    );
};
