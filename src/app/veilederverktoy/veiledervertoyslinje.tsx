import React, {useEffect, useState} from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import { hentTilgangTilBrukersKontor } from '../../store/tilgang-til-brukerskontor/actions';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import { Appstate } from '../../types/appstate';
import { navigerAction } from '../../store/navigation/actions';
import {StringOrNothing} from "../../types/utils/stringornothings";
import FeatureApi from "../../api/feature-api";

interface StateProps {
    tilgangTilBrukersKontor: boolean;
}

interface OwnProps {
    fnr: string;
    enhet?: string;
}

interface DispatchProps {
    hentTilgangTilBrukersKontor: (fnr: string) => void;
    navigerTilProsesser: () => void;
    settEnhetsId: (enhet: StringOrNothing) => void;
}

type VeilederverktoyslinjeProps = StateProps & OwnProps & DispatchProps;

interface Feature {
    visittkort_innstillinger: boolean
}

const handleVeilederKnappClicked = (props: VeilederverktoyslinjeProps, feature: Feature) => {

    if (feature.visittkort_innstillinger) {
        props.navigerTilProsesser();
        return;
    }

    const win = window as any; //tslint:disable-line no-any
    if (win.apneVerktoyModal) {
        win.apneVerktoyModal();
    }
};

function Veilederverktoyslinje(props: VeilederverktoyslinjeProps) {
    const [harVisInnstillingsFeature, setFeature] = useState({visittkort_innstillinger: false});
    useEffect(() => {
        FeatureApi
            .hentFeatures('visittkort_innstillinger')
            .then((harVisInnstillingsFeature: Feature) => setFeature(harVisInnstillingsFeature))
    }, []);


    useEffect(() => {
        props.hentTilgangTilBrukersKontor(props.fnr);
    }, [props.fnr]);

    useEffect(()=> {
        props.settEnhetsId(props.enhet) //TODO FLYTTE TIL DATA-PROVIDERN
    },[props.enhet]);



    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <Arbeidslistekomponent/>
                <TildelVeileder fnr={props.fnr}/>
                <VeilederVerktoyKnapp
                    onClick={() => handleVeilederKnappClicked(props, harVisInnstillingsFeature)}
                    hidden={props.tilgangTilBrukersKontor}
                />
                <VeilederVerktoyNavigation/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    tilgangTilBrukersKontor: state.tilgangTilBrukersKontor.data.tilgangTilBrukersKontor
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentTilgangTilBrukersKontor: (fnr: string) => dispatch(hentTilgangTilBrukersKontor(fnr)),
    navigerTilProsesser: () => dispatch(navigerAction('prosesser')),
    settEnhetsId: (enhet: string)=> dispatch({type: 'SETT_ENHET_FRA_PERSONFLATEFS', enhet}) //TRENGER DENNE INNE I OPPGAVEFORM
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps) (Veilederverktoyslinje);
