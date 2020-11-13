import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logEvent } from '../../utils/frontend-logger';
import { navigerAction } from '../../../store/navigation/actions';

export function FeilTildelingModal() {
    const dispatch = useDispatch();

    const lukkModal = () => {
        logEvent('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        dispatch(navigerAction(null));
    };

    return (
        <VarselModal
            isOpen={true}
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
