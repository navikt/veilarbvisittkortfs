import React from 'react';
import FormikModal from '../../components/formik/formik-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { Form } from 'formik';
import FormikCheckBox from '../../components/formik/formik-checkbox';
import BegrunnelseFooter from '../begrunnelseform/begrunnelse-form-footer';
import { BegrunnelseTextArea } from '../begrunnelseform/begrunnelse-textarea';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { ModalType, useModalStore } from '../../../store-midlertidig/modal-store';
import { useDataStore } from '../../../store-midlertidig/data-store';
import { eskaleringVarselSendtEvent } from '../../../util/utils';
import { nyHenvendelse, stoppEskalering, useFetchOppfolging } from '../../../api/api-midlertidig';
import { Egenskaper } from '../../../api/data/dialog';
import './stopp-eskalering.less';

interface FormValues {
    begrunnelse: string;
    skalSendeHendelse: boolean;
}

const initialFormValues: FormValues = {
    begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.',
    skalSendeHendelse: false,
};

function StoppEskalering() {
    const { brukerFnr } = useAppStore();
    const { oppfolging, setOppfolging } = useDataStore();
    const { showModal, showErrorModal, showSpinnerModal } = useModalStore();

    const fetchOppfolging = useFetchOppfolging(brukerFnr, { manual: true });

    async function startStoppingAvEskalering(values: FormValues) {
        showSpinnerModal();

        try {
            if (values.skalSendeHendelse && values.begrunnelse) {
                const stoppEskaleringHenvendelse = {
                    begrunnelse: values.begrunnelse,
                    egenskaper: [Egenskaper.ESKALERINGSVARSEL],
                    dialogId: oppfolging.gjeldendeEskaleringsvarsel?.tilhorendeDialogId || '',
                    tekst: values.begrunnelse,
                };

                await nyHenvendelse(brukerFnr, stoppEskaleringHenvendelse);
            }

            await stoppEskalering(brukerFnr, values.begrunnelse);

            // Hent oppdatert data uten eskaleringsvarsel
            await fetchOppfolging
                .fetch()
                .then((res) => setOppfolging(res.data))
                .catch(); // Selv om henting av oppfolging feiler så ønsker vi å vise kvittering på at stopping av eskalering gikk greit

            eskaleringVarselSendtEvent();

            showModal(ModalType.STOPP_ESKALERING_KVITTERING);
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
            render={(formikProps) => {
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
