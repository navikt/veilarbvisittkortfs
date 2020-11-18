import React from 'react';
import { Form } from 'formik';
import { Undertittel } from 'nav-frontend-typografi';
import moment from 'moment';
import OpprettOppgaveTemaSelector from './components/opprett-oppgave-tema-selector';
import OppgaveInnerForm from './components/oppgave-inner-form';
import FormikModal from '../../components/formik/formik-modal';
import { OrNothing } from '../../../util/type/ornothing';
import { StringOrNothing } from '../../../util/type/stringornothings';
import { OppgaveFormData, OppgaveTema, OppgaveType, PrioritetType } from '../../../api/data/oppgave';
import { useModalStore } from '../../../store-midlertidig/modal-store';
import { opprettOppgave } from '../../../api/api-midlertidig';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { useDataStore } from '../../../store-midlertidig/data-store';
import { selectSammensattNavn } from '../../../util/selectors';
import './opprett-oppgave.less';

export interface OpprettOppgaveFormValues {
    beskrivelse: string;
    enhetId: string;
    fnr: string;
    fraDato: string;
    tilDato: string;
    prioritet: PrioritetType;
    tema: OrNothing<OppgaveTema>;
    type: OppgaveType;
    avsenderenhetId: StringOrNothing;
    veilederId: StringOrNothing;
}

function OpprettOppgave() {
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal, showOpprettOppgaveKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    const opprettOppgaveInitialValues: OpprettOppgaveFormValues = {
        beskrivelse: '',
        enhetId: '',
        fnr: brukerFnr,
        fraDato: moment().format('YYYY-MM-DD').toString(),
        tilDato: moment().format('YYYY-MM-DD').toString(),
        prioritet: 'NORM',
        tema: undefined,
        type: 'VURDER_HENVENDELSE',
        veilederId: null,
        avsenderenhetId: enhetId,
    };

    function lagreOppgave(formdata: OppgaveFormData) {
        showSpinnerModal();

        opprettOppgave(brukerFnr, formdata)
            .then((res) => {
                showOpprettOppgaveKvitteringModal({ type: res.data.type, tema: res.data.tema });
            })
            .catch(showErrorModal);
    }

    return (
        <FormikModal
            initialValues={opprettOppgaveInitialValues}
            handleSubmit={lagreOppgave}
            contentLabel="Opprett gosys oppgave"
            tilbakeTekst="Tilbake"
            tittel="Opprett en Gosys-oppgave"
            className="opprett-oppgave"
            render={(formikProps) => (
                <div className="modal-innhold">
                    <Undertittel className="opprett-oppgave__undertittel">{`Oppfølging av ${navn}`}</Undertittel>
                    <Form>
                        <OpprettOppgaveTemaSelector />
                        <OppgaveInnerForm
                            tema={formikProps.values.tema}
                            fnr={brukerFnr}
                            enhetId={formikProps.values.enhetId}
                            veilederId={formikProps.values.veilederId}
                            avsenderenhetId={enhetId}
                            formikProps={formikProps}
                            tilbake={hideModal}
                        />
                    </Form>
                </div>
            )}
        />
    );
}

export default OpprettOppgave;
