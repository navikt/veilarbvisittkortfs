import FormikModal from '../../components/formik/formik-modal';
import { Form } from 'formik';
import FormikCheckBox from '../../components/formik/formik-checkbox';
import BegrunnelseFooter from '../begrunnelseform/begrunnelse-form-footer';
import { BegrunnelseTextArea } from '../begrunnelseform/begrunnelse-textarea';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { eskaleringVarselSendtEvent } from '../../../util/utils';
import { stopEskalering } from '../../../api/veilarbdialog';
import './stopp-eskalering.less';
import { BodyShort } from '@navikt/ds-react';

interface FormValues {
    begrunnelse: string;
    skalSendeHendelse: boolean;
}

const initialFormValues: FormValues = {
    begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.',
    skalSendeHendelse: false
};

function StoppEskalering() {
    const { brukerFnr } = useAppStore();
    const { setGjeldendeEskaleringsvarsel } = useDataStore();
    const { showStoppEskaleringKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    async function startStoppingAvEskalering(values: FormValues) {
        showSpinnerModal();

        // Hvis eskaleringsvarselet ble startet i veilarboppfolging så må vi stoppe varselet der også istedenfor i veilarbdialog
        // Denne IF-en er midlertidig™, og kan fjernes når eskaleringsvarsel er migrert helt ut av veilarboppfolging

        try {
            await stopEskalering({
                fnr: brukerFnr,
                begrunnelse: values.begrunnelse,
                skalSendeHenvendelse: values.skalSendeHendelse
            });

            setGjeldendeEskaleringsvarsel(null);

            eskaleringVarselSendtEvent();
            showStoppEskaleringKvitteringModal();
        } catch (e) {
            showErrorModal();
        }
    }

    return (
        <FormikModal
            tittel="Fjern markering av varsel"
            className="stopp-eskalering"
            initialValues={initialFormValues}
            handleSubmit={startStoppingAvEskalering}
            visConfirmDialog={false}
            render={formikProps => {
                return (
                    <div>
                        <Form>
                            <FormikCheckBox name="skalSendeHendelse" label={'Send bruker en henvendelse'} />
                            {formikProps.values.skalSendeHendelse && (
                                <>
                                    <BodyShort size="small" className="stopp-eskalering__tekst">
                                        Legg inn eller rediger tekst som du sender til brukeren.
                                    </BodyShort>
                                    <BegrunnelseTextArea
                                        tekstariaLabel="Se eksempel på tekst til brukeren under:"
                                        maxLength={500}
                                    />
                                </>
                            )}
                            {/* TODO: isLoading: OppfolgingSelector.selectOppfolgingStatus(state)*/}
                            <BegrunnelseFooter spinner={false} />
                        </Form>
                    </div>
                );
            }}
        />
    );
}

export default StoppEskalering;
