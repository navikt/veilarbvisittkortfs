import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { logMetrikk } from '../../../util/logger';
import { useModalStore } from '../../../store/modal-store';
import {BodyLong, BodyShort, Heading} from "@navikt/ds-react";

export function FeilTildelingModal() {
    const { hideModal } = useModalStore();

    const lukkModal = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        hideModal();
    };

    return (
        <VarselModal
            isOpen={true}
            contentLabel="Tildeling av veileder feilet"
            closeButton={false}
            type="FEIL"
            onRequestClose={lukkModal}
        >
            <Heading level="2" size="medium">Handlingen kan ikke utføres</Heading>
            <BodyLong className="feil-modal-normaltekst">
                Tildeling av veileder feilet. Det kan skyldes manglende tilgang til brukeren, at veilederen allerede er
                tildelt brukeren, eller at brukeren ikke er under oppfølging.
            </BodyLong>
            <button className="knapp knapp--hoved feil-modal-knapp" onClick={lukkModal}>
                Ok
            </button>
        </VarselModal>
    );
}
