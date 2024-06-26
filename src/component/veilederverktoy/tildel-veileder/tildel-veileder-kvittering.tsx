import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Button, Heading } from '@navikt/ds-react';

export interface TildelVeilederKvitteringProps {
    tildeltVeilederNavn: string;
}

export function TildelVeilederKvittering(props: TildelVeilederKvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal isOpen={true} onRequestClose={hideModal} type="SUCCESS" inkluderIkon={false}>
            <Heading size="large" level="1">
                Tildel veileder
            </Heading>
            <BodyShort size="small">
                Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min oversikt.
            </BodyShort>
            <Button variant="primary" size="small" onClick={hideModal}>
                Ok
            </Button>
        </VarselModal>
    );
}
