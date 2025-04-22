import { Form } from 'formik';
import { Heading } from '@navikt/ds-react';
import OpprettOppgaveTemaSelector from './components/opprett-oppgave-tema-selector';
import OppgaveInnerForm from './components/oppgave-inner-form';
import FormikModal from '../../components/formik/formik-modal';
import { useModalStore } from '../../../store/modal-store';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { selectSammensattNavn } from '../../../util/selectors';
import { todayReversedDateStr } from '../../../util/date-utils';
import { OppgaveTema, OppgaveType, opprettOppgave, PrioritetType } from '../../../api/veilarboppgave';
import { StringOrNothing } from '../../../util/type/utility-types';
import './opprett-oppgave.less';

export interface OpprettOppgaveFormValues {
    beskrivelse: string;
    kontorId: string;
    fnr: string;
    fraDato: string;
    tilDato: string;
    prioritet: PrioritetType;
    tema: OppgaveTema;
    type: OppgaveType;
    avsenderenhetId: string;
    veilederId: StringOrNothing;
}

function OpprettOppgave() {
    const { brukerFnr, enhetId } = useAppStore();
    const { personalia } = useDataStore();
    const { hideModal, showOpprettOppgaveKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const opprettOppgaveInitialValues: Omit<OpprettOppgaveFormValues, 'tema'> = {
        beskrivelse: '',
        kontorId: '',
        fnr: brukerFnr,
        fraDato: todayReversedDateStr(),
        tilDato: todayReversedDateStr(),
        prioritet: 'NORM',
        type: 'VURDER_HENVENDELSE',
        veilederId: null,
        avsenderenhetId: enhetId
    };

    function lagreOppgave(formdata: OpprettOppgaveFormValues) {
        showSpinnerModal();

        opprettOppgave(brukerFnr, {...formdata, enhetId: formdata.kontorId})
            .then(res => {
                showOpprettOppgaveKvitteringModal({ type: res.data.type, tema: res.data.tema });
            })
            .catch(showErrorModal);
    }

    return (
        <FormikModal
            initialValues={opprettOppgaveInitialValues}
            handleSubmit={lagreOppgave}
            tittel="Opprett en Gosys-oppgave"
            className="opprett-oppgave"
            render={formikProps => (
                <div>
                    <Heading
                        size="small"
                        level="2"
                        className="opprett-oppgave__undertittel"
                    >{`Oppfølging av ${navn}`}</Heading>
                    <Form>
                        <OpprettOppgaveTemaSelector />
                        <OppgaveInnerForm
                            tema={formikProps.values.tema}
                            fnr={brukerFnr}
                            kontorId={formikProps.values.kontorId}
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
