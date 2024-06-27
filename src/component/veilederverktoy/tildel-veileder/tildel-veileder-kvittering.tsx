import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { useErUfordeltBruker } from '../../../api/veilarbportefolje';
import { useAppStore } from '../../../store/app-store';

export interface TildelVeilederKvitteringProps {
    tildeltVeilederNavn: string;
}

export function TildelVeilederKvittering(props: TildelVeilederKvitteringProps) {
    const { brukerFnr } = useAppStore();
    const { hideModal } = useModalStore();
    const { mutate: setUfordeltbruker } = useErUfordeltBruker(brukerFnr);

    return (
        <VarselModal isOpen={true} onRequestClose={hideModal} type="SUCCESS" inkluderIkon={false}>
            <Heading size="large" level="1">
                Tildel veileder
            </Heading>
            <BodyShort size="small">
                Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min oversikt.
            </BodyShort>
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
        </VarselModal>
    );
}
