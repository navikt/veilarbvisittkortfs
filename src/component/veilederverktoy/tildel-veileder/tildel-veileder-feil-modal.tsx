import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { logMetrikk } from '../../../util/logger';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Heading, Button } from '@navikt/ds-react';

export function FeilTildelingModal() {
    const { hideModal } = useModalStore();

    const lukkModal = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        hideModal();
    };

    return (
        <VarselModal isOpen={true} type="FEIL" onRequestClose={lukkModal}>
            <Heading size="medium" as="h2">
                Handlingen kan ikke utføres
            </Heading>
            <BodyShort size="small" className="feil-modal-normaltekst">
                Tildeling av veileder feilet. Det kan skyldes manglende tilgang til brukeren, at veilederen allerede er
                tildelt brukeren, eller at brukeren ikke er under oppfølging.
            </BodyShort>
            <Button variant="primary" size="small" onClick={lukkModal}>
                Ok
            </Button>
        </VarselModal>
    );
}
