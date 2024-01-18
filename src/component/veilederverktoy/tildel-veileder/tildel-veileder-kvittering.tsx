import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Heading } from '@navikt/ds-react';

export interface TildelVeilederKvitteringProps {
    tildeltVeilederNavn: string;
}

export function TildelVeilederKvittering(props: TildelVeilederKvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal isOpen={true} onRequestClose={hideModal} type="SUCCESS">
            <Heading size="large" as="h1">
                Tildel veileder
            </Heading>
            <BodyShort size="small">
                Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min oversikt.
            </BodyShort>
        </VarselModal>
    );
}
