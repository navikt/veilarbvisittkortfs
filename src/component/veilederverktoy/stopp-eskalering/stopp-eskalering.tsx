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
import { Egenskaper, hentGjeldendeEskaleringsvarsel, nyHenvendelse, stopEskalering } from '../../../api/veilarbdialog';
import './stopp-eskalering.less';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchOppfolging, stoppEskalering } from '../../../api/veilarboppfolging';

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
    const { oppfolging, setGjeldendeEskaleringsvarsel, setOppfolging } = useDataStore();
    const { showStoppEskaleringKvitteringModal, showErrorModal, showSpinnerModal } = useModalStore();

    const eskaleringsvarselFraVeilarboppfolging = oppfolging?.gjeldendeEskaleringsvarsel != null;

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
    const gjeldendeEskaleringsvarselFetcher = useAxiosFetcher(hentGjeldendeEskaleringsvarsel);

    async function startStoppingAvEskalering(values: FormValues) {
        showSpinnerModal();

        // Hvis eskaleringsvarselet ble startet i veilarboppfolging så må vi stoppe varselet der også istedenfor i veilarbdialog
        // Denne IF-en er midlertidig™, og kan fjernes når eskaleringsvarsel er migrert helt ut av veilarboppfolging
        if (eskaleringsvarselFraVeilarboppfolging) {
            try {
                if (values.skalSendeHendelse && values.begrunnelse) {
                    const stoppEskaleringHenvendelse = {
                        begrunnelse: values.begrunnelse,
                        egenskaper: [Egenskaper.ESKALERINGSVARSEL],
                        dialogId: oppfolging?.gjeldendeEskaleringsvarsel?.tilhorendeDialogId || '',
                        tekst: values.begrunnelse
                    };

                    await nyHenvendelse(brukerFnr, stoppEskaleringHenvendelse);
                }

                await stoppEskalering(brukerFnr, values.begrunnelse);

                // Hent oppdatert data uten eskaleringsvarsel
                await oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging));

                eskaleringVarselSendtEvent();
                showStoppEskaleringKvitteringModal();
            } catch (e) {
                showErrorModal();
            }
        } else {
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
