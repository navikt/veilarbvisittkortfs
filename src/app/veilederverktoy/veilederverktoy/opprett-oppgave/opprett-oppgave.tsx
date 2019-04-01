import React from 'react';
import { Form } from 'formik';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Appstate } from '../../../../types/appstate';
import PersonaliaSelector from '../../../../store/personalia/selectors';
import { connect } from 'react-redux';
import { OppgaveFormData, OppgaveTema, OppgaveType, PrioritetType } from '../../../../types/oppgave';
import moment from 'moment';
import { StringOrNothing } from '../../../../types/utils/stringornothings';
import OpprettOppgaveTemaSelector from './components/opprett-oppgave-tema-selector';
import OppgaveInnerForm from './components/oppgave-inner-form';
import './opprett-oppgave.less';
import { Dispatch } from 'redux';
import { lagreOppgave } from '../../../../store/oppgave/actions';
import { OrNothing } from '../../../../types/utils/ornothing';
import FormikModal from '../../../components/formik/formik-modal';
import { navigerTilProcesser } from '../../../../store/navigation/actions';

export interface OpprettOppgaveFormValues {
    beskrivelse: string;
    enhetId: string;
    fnr: string;
    fraDato: string;
    tilDato: string;
    prioritet: PrioritetType;
    tema: OrNothing<OppgaveTema>;
    type: OppgaveType;
    avsenderenhetId: string;
    veilederId: StringOrNothing;
}

interface StateProps {
    navn: string;
    fnr: string;
    avsenderenhetId: StringOrNothing;
}

interface DispatchProps {
    handleSubmit: (formData: OppgaveFormData) => void;
    tilbakeTilProcesser: () => void;
}

type OpprettOppgaveProps = StateProps & DispatchProps;

function OpprettOppgave({navn, fnr, avsenderenhetId, handleSubmit, tilbakeTilProcesser}: OpprettOppgaveProps) {

    const opprettOppgaveInitialValues: OpprettOppgaveFormValues = {
        beskrivelse: '',
        enhetId: '',
        fnr,
        fraDato: moment().format('YYYY-MM-DD').toString(),
        tilDato: moment().format('YYYY-MM-DD').toString(),
        prioritet: 'NORM',
        tema: null ,
        type: 'VURDER_HENVENDELSE',
        veilederId: null,
        avsenderenhetId: avsenderenhetId || '',
    };

    return (
        <FormikModal
            initialValues={opprettOppgaveInitialValues}
            handleSubmit={handleSubmit}
            contentLabel="Opprett gosys oppgave"
            tilbake={tilbakeTilProcesser}
            tilbakeTekstId="Tilbake"
            render={(formikProps) =>
                <div className="modal-innhold">
                    <div className="blokk-xs">
                        <Innholdstittel className="modal-info-tekst__overskrift">
                            <FormattedMessage
                                id="innstillinger.modal.overskrift"
                                values={{navn}}
                            />
                        </Innholdstittel>
                        <Undertittel>
                            <FormattedMessage
                                id="innstillinger.modal.oppgave-overskrift"
                            />
                        </Undertittel>
                    </div>
                    <Form>
                        <OpprettOppgaveTemaSelector/>
                        <OppgaveInnerForm
                            tema={formikProps.values.tema}
                            fnr={fnr}
                            enhetId={formikProps.values.enhetId}
                            veilederId={formikProps.values.veilederId}
                            avsenderenhetId={avsenderenhetId}
                            formikProps={formikProps}
                        />
                    </Form>
                </div>
            }
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    fnr: PersonaliaSelector.selectFodselsnummer(state),
    navn: PersonaliaSelector.selectSammensattNavn(state),
    avsenderenhetId: state.enhetId.enhet,

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (formdata: OppgaveFormData) => dispatch(lagreOppgave(formdata)),
    tilbakeTilProcesser: () => dispatch(navigerTilProcesser())
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(OpprettOppgave);