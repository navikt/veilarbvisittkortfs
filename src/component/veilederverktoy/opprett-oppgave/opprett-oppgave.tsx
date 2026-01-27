import { Form } from 'formik';
import { Heading } from '@navikt/ds-react';
import OpprettOppgaveTemaSelector from './components/opprett-oppgave-tema-selector';
import OppgaveInnerForm from './components/oppgave-inner-form';
import FormikModal from '../../components/formik/formik-modal';
import { useModalStore } from '../../../store/modal-store';
import { useEnhetId } from '../../../store/app-store';
import { selectSammensattNavn } from '../../../util/selectors';
import { todayReversedDateStr } from '../../../util/date-utils';
import { BehandlingsTema, OppgaveTema, OppgaveType, opprettOppgave, PrioritetType } from '../../../api/veilarboppgave';
import { StringOrNothing } from '../../../util/type/utility-types';
import './opprett-oppgave.less';
import { usePersonalia } from '../../../api/veilarbperson';
import OppgaveInnerFormAapUfore from './components/oppgave-inner-form-aap-ufore';

export interface OpprettOppgaveFormValues {
    beskrivelse: string;
    enhetId: string;
    fnr: string;
    fraDato: string;
    tilDato: string;
    prioritet: PrioritetType;
    tema: OppgaveTema;
    behandlingsTema: BehandlingsTema;
    type: OppgaveType;
    avsenderenhetId: string;
    veilederId: StringOrNothing;
}

function OpprettOppgave({ brukerFnr }: { brukerFnr: string }) {
    const enhetId = useEnhetId();
    const { personalia } = usePersonalia(brukerFnr);
    const { hideModal, showOpprettOppgaveKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    const navn = selectSammensattNavn(personalia);

    if (!enhetId) {
        return null;
    }

    const opprettOppgaveInitialValues: Omit<OpprettOppgaveFormValues, 'tema' | 'behandlingsTema'> = {
        beskrivelse: '',
        enhetId: '',
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

        opprettOppgave(brukerFnr, { ...formdata, enhetId: formdata.enhetId })
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
                        {formikProps.values.tema === 'ARBEIDSAVKLARING' ? (
                            <OppgaveInnerFormAapUfore
                                tema={formikProps.values.tema}
                                behandlingsTema={formikProps.values.behandlingsTema}
                                fnr={brukerFnr}
                                enhetId={formikProps.values.enhetId}
                                veilederId={formikProps.values.veilederId}
                                avsenderenhetId={enhetId}
                                formikProps={formikProps}
                                tilbake={hideModal}
                            />
                        ) : (
                            <OppgaveInnerForm
                                tema={formikProps.values.tema}
                                fnr={brukerFnr}
                                enhetId={formikProps.values.enhetId}
                                veilederId={formikProps.values.veilederId}
                                avsenderenhetId={enhetId}
                                formikProps={formikProps}
                                tilbake={hideModal}
                            />
                        )}

                    </Form>
                </div>
            )}
        />
    );
}

export default OpprettOppgave;
