import React, {useEffect, useState} from 'react';
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

interface OwnProps {
    fnr: string;
    visVeilederVerktoy?: boolean;
}

interface DispatchProps {
    navigerTilProsesser: () => void;
}

type VeilederverktoyslinjeProps = OwnProps & DispatchProps;

function Veilederverktoyslinje({ fnr, visVeilederVerktoy, navigerTilProsesser}: VeilederverktoyslinjeProps) {
    const [fjernToastFeature, setFjernToastFeature] =  useState(false);

    useEffect(() => {
        FeatureApi.hentFeatures('veilarbvisittkortfs.fjerntoast')
            .then(resp => setFjernToastFeature(resp['veilarbvisittkortfs.fjerntoast']));
    }, []);

    if (!visVeilederVerktoy) {
        return null;
    }

    console.log('fjernToastFeatureState', fjernToastFeature);
    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <Arbeidslistekomponent fjernToastFeature={fjernToastFeature}/>
                <TildelVeileder fnr={fnr}/>
                <VeilederVerktoyKnapp
                    onClick={navigerTilProsesser}
                />
                <VeilederVerktoyNavigation/>
            </div>
            <Toasts hidden={fjernToastFeature}/>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    navigerTilProsesser: () => dispatch(navigerTilProcesser())
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps) (Veilederverktoyslinje);
