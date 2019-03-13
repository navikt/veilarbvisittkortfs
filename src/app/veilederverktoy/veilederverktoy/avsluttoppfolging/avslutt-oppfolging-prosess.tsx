import React, {useState} from 'react';
import { FormattedMessage } from 'react-intl';
import {Normaltekst} from 'nav-frontend-typografi';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';
import StartProsess from "../prosess/start-prosess";
import {AvslutningStatus} from "../../../../types/oppfolging";
import OppfolgingApi from "../../../../api/oppfolging-api";
import OppfolgingSelector from "../../../../store/oppfolging/selector";
import NavFrontendSpinner from "nav-frontend-spinner";
import VarselStripeAvsluttOppfolging from "./components/varsel-stripe-avslutt-oppfolging";

interface StateProps {
    skjulAvsluttOppfolging: boolean;
    fnr: string
}

interface DispatchProps {
    navigerTilAvsluttOppfolging: () => void;
}

function AvsluttOppfolgingProsess({skjulAvsluttOppfolging, navigerTilAvsluttOppfolging, fnr }: StateProps & DispatchProps) {
    const[avslutningStatus, setAvslutningStatus] = useState({} as AvslutningStatus);
    const[harHentetAvslutningStatus, setHarHentetAvslutningStatus] = useState(false);
    const[isLoading, setIsLoading] = useState(true);

    const hentAvslutningStatus = () => {
        if(!harHentetAvslutningStatus) {
            OppfolgingApi.kanAvslutte(fnr)
                .then((oppfolging) => {
                    if(oppfolging.avslutningStatus){
                        setAvslutningStatus(oppfolging.avslutningStatus);
                    }
                    setIsLoading(false);
                    setHarHentetAvslutningStatus(true)

                })
        }
    };

    if(!harHentetAvslutningStatus) {
        return (
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.avslutt.oppfolging.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={()=> hentAvslutningStatus()}
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.avslutt.oppfolging.tekst"/>
                    </Normaltekst>
                </div>
            </StartProsess>
        );
    }

    if(isLoading){
        return <NavFrontendSpinner type="XL"/>
    }

    if(!avslutningStatus.kanAvslutte){
        return (
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.avslutt.oppfolging.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.avslutt.oppfolging.tekst"/>
                    </Normaltekst>
                    <VarselStripeAvsluttOppfolging {...avslutningStatus}/>
                </div>
            </StartProsess>
        )
    }
    else {
        navigerTilAvsluttOppfolging();
        return null;
    }

}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return {
        skjulAvsluttOppfolging: !oppfolging.underOppfolging || !state.tilgangTilBrukersKontor.data.tilgangTilBrukersKontor,
        fnr: OppfolgingSelector.selectFnr(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilAvsluttOppfolging: () => dispatch(navigerAction('avslutt_oppfolging'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolgingProsess);