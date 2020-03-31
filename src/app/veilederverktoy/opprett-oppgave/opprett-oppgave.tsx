import React from 'react';
import { Form } from 'formik';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelector from '../../../store/personalia/selectors';
import { connect } from 'react-redux';
import { OppgaveFormData, OppgaveTema, OppgaveType, PrioritetType } from '../../../types/oppgave';
import moment from 'moment';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import OpprettOppgaveTemaSelector from './components/opprett-oppgave-tema-selector';
import OppgaveInnerForm from './components/oppgave-inner-form';
import './opprett-oppgave.less';
import { Dispatch } from 'redux';
import { lagreOppgave } from '../../../store/oppgave/actions';
import { OrNothing } from '../../../types/utils/ornothing';
import FormikModal from '../../components/formik/formik-modal';
import { navigerAction, navigerTilProcesser } from '../../../store/navigation/actions';
import { hentEnhetsIdFraUrl } from '../../utils/utils';

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
}

interface DispatchProps {
    handleSubmit: (formData: OppgaveFormData) => void;
    tilbakeTilProcesser: () => void;
    tilbake: () => void;
}

type OpprettOppgaveProps = StateProps & DispatchProps;

function OpprettOppgave({ navn, fnr, handleSubmit, tilbakeTilProcesser, tilbake }: OpprettOppgaveProps) {
    const avsenderenhetId = hentEnhetsIdFraUrl();

    const opprettOppgaveInitialValues: OpprettOppgaveFormValues = {
        beskrivelse: '',
        enhetId: '',
        fnr,
        fraDato: moment()
            .format('YYYY-MM-DD')
            .toString(),
        tilDato: moment()
            .format('YYYY-MM-DD')
            .toString(),
        prioritet: 'NORM',
        tema: undefined,
        type: 'VURDER_HENVENDELSE',
        veilederId: null,
        avsenderenhetId
    };

    return (
        <FormikModal
            initialValues={opprettOppgaveInitialValues}
            handleSubmit={handleSubmit}
            contentLabel="Opprett gosys oppgave"
            tilbake={tilbakeTilProcesser}
            tilbakeTekstId="Tilbake"
            render={formikProps => (
                <div className="modal-innhold">
                    <div className="blokk-xs">
                        <Innholdstittel className="modal-info-tekst__overskrift">
                            {`Oppfølging av ${navn}`}
                        </Innholdstittel>
                        <Undertittel>Opprett en Gosys-oppgave</Undertittel>
                    </div>
                    <Form>
                        <OpprettOppgaveTemaSelector />
                        <OppgaveInnerForm
                            tema={formikProps.values.tema}
                            fnr={fnr}
                            enhetId={formikProps.values.enhetId}
                            veilederId={formikProps.values.veilederId}
                            avsenderenhetId={avsenderenhetId}
                            formikProps={formikProps}
                            tilbake={tilbake}
                        />
                    </Form>
                </div>
            )}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    fnr: PersonaliaSelector.selectFodselsnummer(state),
    navn: PersonaliaSelector.selectSammensattNavn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (formdata: OppgaveFormData) => dispatch(lagreOppgave(formdata)),
    tilbakeTilProcesser: () => dispatch(navigerTilProcesser()),
    tilbake: () => dispatch(navigerAction(null))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(OpprettOppgave);
