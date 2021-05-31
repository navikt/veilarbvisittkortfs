import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { useModalStore } from '../../../store/modal-store';

export interface TildelVeilederKvitteringProps {
    tildeltVeilederNavn: string;
}

export function TildelVeilederKvittering(props: TildelVeilederKvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal
            isOpen={true}
            onRequestClose={hideModal}
            contentLabel="Vellykket tildeling"
            type="SUCCESS"
            data-testid="tildelVeilederKvittering"
        >
            <Innholdstittel>Tildel veileder</Innholdstittel>
            <Normaltekst>
                Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min oversikt.
            </Normaltekst>
        </VarselModal>
    );
}
