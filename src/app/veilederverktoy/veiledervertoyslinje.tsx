import React, { useEffect } from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidslistekomponent';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import { hentTilgangTilBrukersKontor } from '../../store/tilgang-til-brukerskontor/actions';
import { navigerTilProsesser } from '../../store/navigation/actions';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import { Appstate } from '../../types/appstate';

interface StateProps {
    tilgangTilBrukersKontor: boolean;
}

interface OwnProps {
    fnr: string;
}

interface DispatchProps {
    hentTilgangTilBrukersKontor: (fnr: string) => void;
    navigerTilProsesser: () => void;
}

type VeilederverktoyslinjeProps = StateProps & OwnProps & DispatchProps;

function Veilederverktoyslinje(props: VeilederverktoyslinjeProps) {

    useEffect(() => {
        props.hentTilgangTilBrukersKontor(props.fnr); //TODO flytta in i initialdataprovidern?
    }, []);

    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <Arbeidslistekomponent/>
                <TildelVeileder/>
                <VeilederVerktoyKnapp
                    onClick={props.navigerTilProsesser}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    hentTilgangTilBrukersKontor: (fnr: string) => dispatch(hentTilgangTilBrukersKontor(fnr)),
    navigerTilProsesser: () => dispatch(navigerTilProsesser())
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps) (Veilederverktoyslinje);