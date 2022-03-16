import React from 'react';
import FormikModal from '../../components/formik/formik-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { Form } from 'formik';
import FormikCheckBox from '../../components/formik/formik-checkbox';
import BegrunnelseFooter from '../begrunnelseform/begrunnelse-form-footer';
import { BegrunnelseTextArea } from '../begrunnelseform/begrunnelse-textarea';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { eskaleringVarselSendtEvent, ifResponseHasData } from '../../../util/utils';
import { hentGjeldendeEskaleringsvarsel, stopEskalering } from '../../../api/veilarbdialog';
import './stopp-eskalering.less';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';

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

    const gjeldendeEskaleringsvarselFetcher = useAxiosFetcher(hentGjeldendeEskaleringsvarsel);

    async function startStoppingAvEskalering(values: FormValues) {
        showSpinnerModal();

        try {
            await stopEskalering({
                fnr: brukerFnr,
                begrunnelse: values.begrunnelse,
                skalSendeHendvendelse: values.skalSendeHendelse
            });

            // Hent oppdatert data uten eskaleringsvarsel
            await gjeldendeEskaleringsvarselFetcher
                .fetch(brukerFnr)
                .then(ifResponseHasData(setGjeldendeEskaleringsvarsel));

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
            contentLabel="Stopp begrunnelse"
            visConfirmDialog={false}
            render={formikProps => {
                return (
                    <div className="modal-innhold">
                        <Form>
                            <FormikCheckBox name="skalSendeHendelse" label={'Send bruker en henvendelse'} />
                            {formikProps.values.skalSendeHendelse && (
                                <>
                                    <Normaltekst className="stopp-eskalering__tekst">
                                        Legg inn eller rediger tekst som du sender til brukeren.
                                    </Normaltekst>
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
