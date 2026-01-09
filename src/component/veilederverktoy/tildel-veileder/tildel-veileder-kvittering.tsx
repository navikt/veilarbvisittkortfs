import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { useErUfordeltBruker } from '../../../api/veilarbportefolje';
import { useBrukerFnr } from '../../../store/app-store';
import { useVisVeilederVerktøy } from '../../../store/visittkort-config';

export interface TildelVeilederKvitteringProps {
    tildeltVeilederNavn: string;
}

export function TildelVeilederKvittering({ tildeltVeilederNavn }: TildelVeilederKvitteringProps) {
    const brukerFnr = useBrukerFnr();
    const visVeilederVerktoy = useVisVeilederVerktøy();
    const { hideModal } = useModalStore();
    const { mutate: setUfordeltbruker } = useErUfordeltBruker(brukerFnr, visVeilederVerktoy);

    return (
        <VarselModal isOpen={true} onRequestClose={hideModal} type="SUCCESS" inkluderIkon={false}>
            <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
                <Heading size="large" level="1">
                    Tildel veileder
                </Heading>
                <BodyShort size="small">
                    Du har tildelt veileder {tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min oversikt.
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => {
                        setTimeout(() => setUfordeltbruker(false), 1000);
                        hideModal();
                    }}
                >
                    Ok
                </Button>
            </Modal.Footer>
        </VarselModal>
    );
}
