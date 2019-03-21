import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import AvsluttOppfolgingStatusSelector from '../../../../store/avslutningstatus/selector';
import { OrNothing } from '../../../../types/utils/ornothing';
import { AvslutningStatus } from '../../../../types/oppfolging';
import { lagreBegrunnelse } from '../../../../store/avslutningstatus/actions';
import moment from 'moment';

interface StateProps {
    begrunnelse: string;
    avslutningStatus: OrNothing<AvslutningStatus>;
    datoErInnenFor28DagerSiden: boolean;
}

interface DispatchProps {
    handleSubmit: (values: BegrunnelseValues) => void;
}

type AvsluttOppfolging = StateProps & DispatchProps;

function AvsluttOppfolging (props: AvsluttOppfolging) {

    const aktivMindreEnn28Dager = props.datoErInnenFor28DagerSiden ?
        'innstillinger.modal.avslutt.oppfolging.beskrivelse.innenfor-28-dager'
         : 'innstillinger.modal.avlutt.oppfolging.overskrift';

    return (
        <BegrunnelseForm
            initialValues={{begrunnelse: props.begrunnelse}}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren nå kan få digital oppfølging"
            overskriftTekstId={aktivMindreEnn28Dager}
            isLoading={false}
            infoTekst={<AvsluttOppfolgingInfoText avslutningStatus={props.avslutningStatus}/>}
        />
    );
}

//FLYTTE TIL VEILEDERVERTOY NAVIGATION ???

const mapStateToProps = (state: Appstate) => {
    const avslutningStatus =  AvsluttOppfolgingStatusSelector.selectAvsluttOppfolgingData(state);
    const for28dagerSide = moment().subtract(28, 'day').toISOString();
    const datoErInnenFor28DagerSiden = ((avslutningStatus && avslutningStatus.inaktiveringsDato) || 0) > for28dagerSide;
    return {
        begrunnelse: AvsluttOppfolgingStatusSelector.selectBegrunnelse(state) || '',
        avslutningStatus,
        datoErInnenFor28DagerSiden
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (values: BegrunnelseValues) => dispatch(lagreBegrunnelse(values.begrunnelse)),
});

export default connect<StateProps , DispatchProps>(mapStateToProps , mapDispatchToProps)(AvsluttOppfolging);