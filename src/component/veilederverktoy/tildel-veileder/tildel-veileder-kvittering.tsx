import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import {BodyShort, Heading} from "@navikt/ds-react";

export interface TildelVeilederKvitteringProps {
    tildeltVeilederNavn: string;
}

export function TildelVeilederKvittering(props: TildelVeilederKvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal isOpen={true} onRequestClose={hideModal} contentLabel="Vellykket tildeling" type="SUCCESS">
            <Heading level="2" size="medium">Tildel veileder</Heading>
            <BodyShort>
                Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min oversikt.
            </BodyShort>
        </VarselModal>
    );
}
