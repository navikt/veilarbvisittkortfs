import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Appstate } from '../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AvsluttOppfolgingInfoText } from './components/avslutt-oppfolging-info-text';
import AvsluttOppfolgingStatusSelector from '../../../store/avslutningstatus/selector';
import PersonaliaSelector from '../../../store/personalia/selectors';
import { OrNothing } from '../../../types/utils/ornothing';
import { AvslutningStatus } from '../../../types/oppfolging';
import { lagreBegrunnelse, resetBegrunnelse } from '../../../store/avslutningstatus/actions';
import moment from 'moment';
import DialogSelector from '../../../store/dialog/selector';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { navigerAction } from '../../../store/navigation/actions';

interface StateProps {
    begrunnelse: string;
    avslutningStatus: OrNothing<AvslutningStatus>;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
    fnr: string;
    isLoading: boolean;
}

interface DispatchProps {
    handleSubmit: (values: BegrunnelseValues) => void;
    lukkModal: () => void;
}

type AvsluttOppfolgingProps = StateProps & DispatchProps;

function AvsluttOppfolging(props: AvsluttOppfolgingProps) {
    if (props.isLoading) {
        return <LasterModal />;
    }

    const kanAvslutte = props.avslutningStatus && props.avslutningStatus.kanAvslutte;
    if (!kanAvslutte) {
        const underOppfolging = props.avslutningStatus && props.avslutningStatus.underOppfolging;
        const underKvp = props.avslutningStatus && props.avslutningStatus.underKvp;
        return (
            <VarselModal
                contentLabel="Oppfølgingsperioden før brukeren kan ikke avslutes"
                isOpen={true}
                onRequestClose={props.lukkModal}
                type="ADVARSEL"
            >
                Du kan ikke avslutte oppfølgingsperioden fordi:
                <ul className="avslutt-oppfolging__ul">
                    {underOppfolging && <li>Brukeren har aktiv status i Arena.</li>}
                    {underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
                </ul>
            </VarselModal>
        );
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: props.begrunnelse }}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse"
            tittel="Avslutt oppfølgingsperioden"
            isLoading={false}
            infoTekst={
                <>
                    <AvsluttOppfolgingInfoText
                        avslutningStatus={props.avslutningStatus}
                        harYtelser={props.avslutningStatus?.harYtelser}
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
    const avslutningStatus = AvsluttOppfolgingStatusSelector.selectAvsluttOppfolgingData(state);
    const for28dagerSide = moment().subtract(28, 'day').toISOString();
    const datoErInnenFor28DagerSiden = ((avslutningStatus && avslutningStatus.inaktiveringsDato) || 0) > for28dagerSide;

    return {
        begrunnelse: AvsluttOppfolgingStatusSelector.selectBegrunnelse(state) || '',
        harUbehandledeDialoger: DialogSelector.selectHarUbehandledeDialoger(state),
        avslutningStatus,
        datoErInnenFor28DagerSiden,
        fnr: PersonaliaSelector.selectFodselsnummer(state),
        isLoading: AvsluttOppfolgingStatusSelector.selectAvsluttOppfolgingIsLoading(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (values: BegrunnelseValues) => dispatch(lagreBegrunnelse(values.begrunnelse)),
    lukkModal: () => {
        dispatch(navigerAction(null));
        dispatch(resetBegrunnelse());
    },
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolging);
