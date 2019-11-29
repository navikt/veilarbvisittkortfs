import React, { useEffect, useState } from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { useDispatch, useSelector } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import { navigerTilProcesser } from '../../store/navigation/actions';
import Toasts from '../components/toast/toasts';
import { Appstate } from '../../types/appstate';
import { VarselModal } from '../components/varselmodal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { logEvent } from '../utils/frontend-logger';

interface VeilederverktoyslinjeProps {
    fnr: string;
    visVeilederVerktoy?: boolean;
}

function Veilederverktoyslinje({ fnr, visVeilederVerktoy }: VeilederverktoyslinjeProps) {
    const harFeilendeTildelinger = useSelector((state: Appstate) => !!state.tildelVeileder.tildeltVeileder.error);

    const [visTildelingFeiletModal, setVisTildelingFeiletModal] = useState(harFeilendeTildelinger);

    const dispatch = useDispatch();

    useEffect(() => {
        setVisTildelingFeiletModal(harFeilendeTildelinger);
    }, [harFeilendeTildelinger]);

    const lukkModal = () => {
        logEvent('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        setVisTildelingFeiletModal(false);
    };

    useEffect(() => {
        setVisTildelingFeiletModal(harFeilendeTildelinger);
    }, [harFeilendeTildelinger]);

    if (!visVeilederVerktoy) {
        return null;
    }

    return (
        <div className="veilederverktoylinje-wrapper">
            <div className="veilederverktoyslinje">
                <div className="veilederverktoyslinje__container">
                    <FeilTildelingModal visTildelingFeiletModal={visTildelingFeiletModal} lukkModal={lukkModal} />
                    <Arbeidslistekomponent />
                    <TildelVeileder fnr={fnr} />
                    <VeilederVerktoyKnapp onClick={() => dispatch(navigerTilProcesser())} />
                    <VeilederVerktoyNavigation />
                </div>
            </div>
            <Toasts />
        </div>
    );
}

const FeilTildelingModal = (props: { visTildelingFeiletModal: boolean; lukkModal: () => void }) => {
    return (
        <VarselModal
            isOpen={props.visTildelingFeiletModal}
            contentLabel="Tildeling av veileder feilet"
            closeButton={false}
            type="FEIL"
            onRequestClose={props.lukkModal}
        >
            <Systemtittel>Handlingen kan ikke utføres</Systemtittel>
            <Normaltekst className="feil-modal-normaltekst">
                Tildeling av veileder feilet. Det kan skyldes manglende tilgang på brukeren, eller at veilederen
                allerede er tildelt brukeren.
            </Normaltekst>
            <button className="knapp knapp--hoved feil-modal-knapp" onClick={props.lukkModal}>
                Ok
            </button>
        </VarselModal>
    );
};

export default Veilederverktoyslinje;
