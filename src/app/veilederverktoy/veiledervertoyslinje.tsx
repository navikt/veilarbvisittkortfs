import React, { useEffect, useState } from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import { navigerTilProcesser } from '../../store/navigation/actions';
import FeatureApi from '../../api/feature-api';
import Toasts from '../components/toast/toasts';
import { Appstate } from '../../types/appstate';
import { FeilModal } from '../components/feilmodal/feil-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { logEvent } from '../utils/frontend-logger';

interface OwnProps {
    fnr: string;
    visVeilederVerktoy?: boolean;
}

interface DispatchProps {
    navigerTilProsesser: () => void;
}

interface StateProps {
    harFeilendeTildelinger: boolean;
}

type VeilederverktoyslinjeProps = StateProps & OwnProps & DispatchProps;

function Veilederverktoyslinje({harFeilendeTildelinger, fnr, visVeilederVerktoy, navigerTilProsesser}: VeilederverktoyslinjeProps) {
    const [fjernToastFeature, setFjernToastFeature] = useState(false);

    const [visTildelingFeiletModal, setVisTildelingFeiletModal] = useState(harFeilendeTildelinger);

    const lukkModal = () => {
        logEvent('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        setVisTildelingFeiletModal(false);
    };

    const FeilTildelingModal = () => {
        return (
            <FeilModal
                isOpen={visTildelingFeiletModal}
                contentLabel="Tildeling av veileder feilet"
                closeButton={false}
                onRequestClose={() => lukkModal()}
            >
                <Systemtittel>Handlingen kan ikke utføres</Systemtittel>
                <Normaltekst className="feil-modal-normaltekst">
                    Tildeling av veileder feilet. Det kan skyldes manglende tilgang på brukere, eller at veilederen allerede er tildelt brukeren.
                </Normaltekst>
                <button
                    className="knapp knapp--hoved feil-modal-knapp"
                    onClick={lukkModal}
                >
                    Ok
                </button>
            </FeilModal>
        );
    };

    useEffect(() => {
        FeatureApi.hentFeatures('veilarbvisittkortfs.fjerntoast')
            .then(resp => setFjernToastFeature(resp['veilarbvisittkortfs.fjerntoast']));
    }, []);

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
                <FeilTildelingModal/>
                <Arbeidslistekomponent fjernToastFeature={fjernToastFeature}/>
                <TildelVeileder fnr={fnr}/>
                <VeilederVerktoyKnapp
                    onClick={navigerTilProsesser}
                />
                <VeilederVerktoyNavigation/>
            </div>
        </div>
            <Toasts/>
         </div>
    );
}

const mapStateToProps = (state: Appstate) => ({
    harFeilendeTildelinger: state.tildelVeileder.status === 'ERROR'
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    navigerTilProsesser: () => dispatch(navigerTilProcesser())
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Veilederverktoyslinje);
