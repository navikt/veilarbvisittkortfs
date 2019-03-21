import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from '../prosess/start-prosess';
import VarselStripeAvsluttOppfolging from './components/varsel-stripe-avslutt-oppfolging';
import visibleIf from '../../../components/visible-if';
import { Appstate } from '../../../../types/appstate';
import AvsluttOppfolgingStatusSelector from '../../../../store/avslutningstatus/selector';
import { Dispatch } from 'redux';
import { hentAvsluttningStatus } from '../../../../store/avslutningstatus/actions';
import { connect } from 'react-redux';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { OrNothing } from '../../../../types/utils/ornothing';
import { AvslutningStatus } from '../../../../types/oppfolging';

interface StateProps {
    isLoading: boolean;
    avslutningStatus: OrNothing<AvslutningStatus>;
}

interface DispatchProps {
    hentAvsluttOppfolgingStatus: () => void;
}

type AvsluttOppfolgingProsessProps = StateProps & DispatchProps;

function AvsluttOppfolgingProsess(props: AvsluttOppfolgingProsessProps) {
    const kanAvslutte = props.avslutningStatus && props.avslutningStatus.kanAvslutte;

    const handleClick = () => {
        props.hentAvsluttOppfolgingStatus();
    };

    if (props.isLoading) {
        return <NavFrontendSpinner type="XL"/>;
    }

    return (
        <StartProsess
            tittelId="innstillinger.prosess.avslutt.oppfolging.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={handleClick}
            hiddenKnapp={!!props.avslutningStatus && !props.avslutningStatus.kanAvslutte}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.avslutt.oppfolging.tekst"/>
                </Normaltekst>
                {!kanAvslutte && <VarselStripeAvsluttOppfolging avslutningStatus={props.avslutningStatus}/>}
            </div>
        </StartProsess>
    );

}

const mapStateToProps = (state: Appstate): StateProps => ({
    isLoading: AvsluttOppfolgingStatusSelector.selectAvsluttOppfolgingIsLoading(state),
    avslutningStatus: AvsluttOppfolgingStatusSelector.selectAvsluttOppfolgingData(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
   hentAvsluttOppfolgingStatus :  () => dispatch(hentAvsluttningStatus())
});

export default visibleIf(connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolgingProsess));