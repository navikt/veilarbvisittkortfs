import React, { useEffect } from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import { hentTilgangTilBrukersKontor } from '../../store/tilgang-til-brukerskontor/actions';
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
}

type VeilederverktoyslinjeProps = StateProps & OwnProps & DispatchProps;

const handleVeilederKnappClicked = () => {
    const win = window as any; //tslint:disable-line no-any
    if (win.apneVerktoyModal) {
        win.apneVerktoyModal();
    }
};

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
                    onClick={handleVeilederKnappClicked}
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
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps) (Veilederverktoyslinje);
