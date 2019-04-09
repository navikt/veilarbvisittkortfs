import React, { useEffect } from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import { navigerTilProcesser } from '../../store/navigation/actions';
import { StringOrNothing } from '../../types/utils/stringornothings';
import Toasts from '../components/toast/toasts';

interface OwnProps {
    fnr: string;
    enhet?: string;
    visVeilederVerktoy?: boolean;
}

interface DispatchProps {
    navigerTilProsesser: () => void;
    settEnhetsId: (enhet: StringOrNothing) => void;
}

type VeilederverktoyslinjeProps = OwnProps & DispatchProps;

function Veilederverktoyslinje(props: VeilederverktoyslinjeProps) {
    if (!props.visVeilederVerktoy) {
        return null;
    }

    useEffect(() => {
        props.settEnhetsId(props.enhet); //TODO FLYTTE TIL DATA-PROVIDERN fast det er jobbigt....
    }, [props.enhet]);

    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <Arbeidslistekomponent/>
                <TildelVeileder fnr={props.fnr}/>
                <VeilederVerktoyKnapp
                    onClick={props.navigerTilProsesser}
                />
                <VeilederVerktoyNavigation/>
            </div>
            <Toasts/>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    navigerTilProsesser: () => dispatch(navigerTilProcesser()),
    settEnhetsId: (enhet: string) => dispatch({type: 'SETT_ENHET_FRA_PERSONFLATEFS', enhet}) //TRENGER DENNE INNE I OPPGAVEFORM
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps) (Veilederverktoyslinje);
