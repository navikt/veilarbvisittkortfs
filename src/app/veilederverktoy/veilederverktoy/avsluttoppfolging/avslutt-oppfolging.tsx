import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import AvsluttOppfolgingStatusSelector from '../../../../store/avslutningstatus/selector';
import PersonaliaSelector from '../../../../store/personalia/selectors';
import { OrNothing } from '../../../../types/utils/ornothing';
import { AvslutningStatus } from '../../../../types/oppfolging';
import { lagreBegrunnelse } from '../../../../store/avslutningstatus/actions';
import moment from 'moment';
import DialogSelector from '../../../../store/dialog/selector';

interface StateProps {
    begrunnelse: string;
    avslutningStatus: OrNothing<AvslutningStatus>;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
    fnr: string;
}

interface DispatchProps {
    handleSubmit: (values: BegrunnelseValues) => void;
}

type AvsluttOppfolgingProps = StateProps & DispatchProps;

function AvsluttOppfolging (props: AvsluttOppfolgingProps) {

    return (
        <BegrunnelseForm
            initialValues={{begrunnelse: props.begrunnelse}}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse"
            overskriftTekstId="innstillinger.modal.avlutt.oppfolging.overskrift"
            isLoading={false}
            infoTekst={
                <>
                <AvsluttOppfolgingInfoText
                    avslutningStatus={props.avslutningStatus}
                    datoErInnenFor28DagerSiden={props.datoErInnenFor28DagerSiden}
                    harUbehandledeDialoger={props.harUbehandledeDialoger}
                    fnr={props.fnr}
                />
                </>
            }
        />
    );
}

//FLYTTE TIL VEILEDERVERTOY NAVIGATION ???

const mapStateToProps = (state: Appstate): StateProps => {
    const avslutningStatus =  AvsluttOppfolgingStatusSelector.selectAvsluttOppfolgingData(state);
    const for28dagerSide = moment().subtract(28, 'day').toISOString();
    const datoErInnenFor28DagerSiden = ((avslutningStatus && avslutningStatus.inaktiveringsDato) || 0) > for28dagerSide;
    return {
        begrunnelse: AvsluttOppfolgingStatusSelector.selectBegrunnelse(state) || '',
        harUbehandledeDialoger: DialogSelector.selectHarUbehandledeDialoger(state),
        avslutningStatus,
        datoErInnenFor28DagerSiden,
        fnr: PersonaliaSelector.selectFodselsnummer(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (values: BegrunnelseValues) => dispatch(lagreBegrunnelse(values.begrunnelse)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps , mapDispatchToProps)(AvsluttOppfolging);