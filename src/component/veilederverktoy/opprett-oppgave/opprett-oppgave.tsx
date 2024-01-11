import React from 'react';
import {Form} from 'formik';
import OpprettOppgaveTemaSelector from './components/opprett-oppgave-tema-selector';
import OppgaveInnerForm from './components/oppgave-inner-form';
import FormikModal from '../../components/formik/formik-modal';
import { useModalStore } from '../../../store/modal-store';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { selectSammensattNavn } from '../../../util/selectors';
import './opprett-oppgave.less';
import { todayReversedDateStr } from '../../../util/date-utils';
import { OppgaveFormData, OppgaveTema, OppgaveType, opprettOppgave, PrioritetType } from '../../../api/veilarboppgave';
import { OrNothing, StringOrNothing } from '../../../util/type/utility-types';
import { Heading } from '@navikt/ds-react';

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
        fraDato: todayReversedDateStr(),
        tilDato: todayReversedDateStr(),
        prioritet: 'NORM',
        tema: undefined,
        type: 'VURDER_HENVENDELSE',
        veilederId: null,
        avsenderenhetId: enhetId
    };

    function lagreOppgave(formdata: OppgaveFormData) {
        showSpinnerModal();

        opprettOppgave(brukerFnr, formdata)
            .then(res => {
                showOpprettOppgaveKvitteringModal({ type: res.data.type, tema: res.data.tema });
            })
            .catch(showErrorModal);
    }

    if (!enhetId) {
        return null;
    }
    return (
        <FormikModal<OpprettOppgaveFormValues>
            initialValues={opprettOppgaveInitialValues}
            handleSubmit={lagreOppgave}
            tittel="Opprett en Gosys-oppgave"
            className="opprett-oppgave"
            render={formikProps => (
                <>
                    <Heading
                        size="small"
                        as="h2"
                        className="opprett-oppgave__undertittel"
                    >{`Oppfølging av ${navn}`}</Heading>
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
                </>
            )}
        />
    );
}

export default OpprettOppgave;
