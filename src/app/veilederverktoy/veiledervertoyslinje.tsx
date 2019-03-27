import React, { useEffect, useState } from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import { hentTilgangTilBrukersKontor } from '../../store/tilgang-til-brukerskontor/actions';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import { navigerTilProcesser } from '../../store/navigation/actions';
import { StringOrNothing } from '../../types/utils/stringornothings';
import FeatureApi from '../../api/feature-api';

interface OwnProps {
    fnr: string;
    enhet?: string;
    visVeilederVerktoy?: boolean;
}

interface DispatchProps {
    hentTilgangTilBrukersKontor: (fnr: string) => void;
    navigerTilProsesser: () => void;
    settEnhetsId: (enhet: StringOrNothing) => void;
}

type VeilederverktoyslinjeProps = OwnProps & DispatchProps;

interface Feature {
    visittkort_innstillinger: boolean;
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
    if (!props.visVeilederVerktoy) {
        return null;
    }

    const [harVisInnstillingsFeature, setFeature] = useState({visittkort_innstillinger: false});

    useEffect(() => {
        FeatureApi
            .hentFeatures('visittkort_innstillinger')
            .then((harVisInnstillingsFeatureData: Feature) => setFeature(harVisInnstillingsFeatureData));
    }, []);

    useEffect(() => {
        props.hentTilgangTilBrukersKontor(props.fnr);
    }, [props.fnr]);

    useEffect(() => {
        props.settEnhetsId(props.enhet); //TODO FLYTTE TIL DATA-PROVIDERN
    }, [props.enhet]);

    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <Arbeidslistekomponent/>
                <TildelVeileder fnr={props.fnr}/>
                <VeilederVerktoyKnapp
                    onClick={() => handleVeilederKnappClicked(props, harVisInnstillingsFeature)}
                />
                <VeilederVerktoyNavigation/>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentTilgangTilBrukersKontor: (fnr: string) => dispatch(hentTilgangTilBrukersKontor(fnr)),
    navigerTilProsesser: () => dispatch(navigerTilProcesser()),
    settEnhetsId: (enhet: string) => dispatch({type: 'SETT_ENHET_FRA_PERSONFLATEFS', enhet}) //TRENGER DENNE INNE I OPPGAVEFORM
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps) (Veilederverktoyslinje);
