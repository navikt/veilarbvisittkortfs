import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import { logEvent } from '../../utils/frontend-logger';

export function FeilTildelingModal() {
    const harFeilendeTildelinger = useSelector((state: Appstate) => !!state.tildelVeileder.tildeltVeileder.error);
    const [visTildelingFeiletModal, setVisTildelingFeiletModal] = useState(harFeilendeTildelinger);

    const lukkModal = () => {
        logEvent('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        setVisTildelingFeiletModal(false);
    };
    useEffect(() => {
        setVisTildelingFeiletModal(harFeilendeTildelinger);
    }, [harFeilendeTildelinger]);

    return (
        <VarselModal
            isOpen={visTildelingFeiletModal}
            contentLabel="Tildeling av veileder feilet"
            closeButton={false}
            type="FEIL"
            onRequestClose={lukkModal}
        >
            <Systemtittel>Handlingen kan ikke utføres</Systemtittel>
            <Normaltekst className="feil-modal-normaltekst">
                Tildeling av veileder feilet. Det kan skyldes manglende tilgang på brukeren, eller at veilederen
                allerede er tildelt brukeren.
            </Normaltekst>
            <button className="knapp knapp--hoved feil-modal-knapp" onClick={lukkModal}>
                Ok
            </button>
        </VarselModal>
    );
}
