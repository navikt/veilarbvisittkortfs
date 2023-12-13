import { Alert, BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { Arbeidsliste } from '../../api/veilarbportefolje';
import { toSimpleDateStr } from '../../util/date-utils';
import { useModalStore } from '../../store/modal-store';
import './huskelapp.less';
import { TrashIcon } from '@navikt/aksel-icons';

interface Props {
    arbeidsliste: Arbeidsliste | undefined;
    visFjernKnapp: boolean;
}

export const EksisterendeArbeidsliste = ({ arbeidsliste, visFjernKnapp }: Props) => {
    const { showFjernArbeidslisteModal } = useModalStore();
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

            {visFjernKnapp && (
                <Button
                    onClick={() => showFjernArbeidslisteModal()}
                    size="xsmall"
                    variant="primary"
                    icon={<TrashIcon aria-hidden />}
                >
                    <span>Slett</span>
                </Button>
            )}
        </div>
    );
};
