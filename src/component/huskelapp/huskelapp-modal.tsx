import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Modal from '../components/modal/modal';
import VeilederVerktoyModal from '../components/modal/veilederverktoy-modal';
import { dateToISODate, toReversedDateStr } from '../../util/date-utils';
import { HuskelappformValues, lagreHuskelapp, redigerHuskelapp } from '../../api/veilarbportefolje';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { kanFjerneHuskelapp, selectSammensattNavn } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import { ifResponseHasData } from '../../util/utils';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';
import { HuskelappInformasjonsmelding } from './huskelapp-informasjonsmelding';
import HuskelappForm from './huskelapp-form';
import HuskelappFooter from './huskelapp-footer';

const huskelappEmptyValues = {
    kommentar: '',
    frist: ''
};

function HuskelappModal() {
    const { brukerFnr } = useAppStore();
    const {
        hideModal,
        showSpinnerModal,
        showErrorModal,
        showFjernArbeidslisteModal: showFjernHuskelappModal
    } = useModalStore();
    const { huskelapp, oppfolging, innloggetVeileder, personalia, setHuskelapp } = useDataStore();

    const brukerSammensattNavn = selectSammensattNavn(personalia);

    const erIRedigeringModus = huskelapp?.endringstidspunkt;
    const modalTittel = erIRedigeringModus ? 'Rediger huskelapp' : 'Opprett huskelapp';
    const frist = huskelapp?.frist ? huskelapp?.frist.toString() : Date.now().toString();

    const kanFjernesFraArbeidsliste =
        !!huskelapp && kanFjerneHuskelapp(huskelapp, oppfolging, innloggetVeileder?.ident);

    const huskelappValues = {
        kommentar: huskelapp?.kommentar ?? '',
        frist: huskelapp?.frist ? toReversedDateStr(huskelapp.frist) : ''
    };

    const initalValues = huskelapp?.endringstidspunkt ? huskelappValues : huskelappEmptyValues;

    function onRequestClose(formikProps: FormikProps<HuskelappformValues>) {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            hideModal();
            logMetrikk('veilarbvisittkortfs.metrikker.huskelapp.avbryt');
            formikProps.resetForm();
        }
    }

    function handleSubmit(values: HuskelappformValues) {
        logMetrikk('veilarbvisittkortfs.metrikker.huskelapp', {
            leggtil: !erIRedigeringModus,
            applikasjon: 'visittkort'
        });

        trackAmplitude(
            {
                name: 'skjema fullført',
                data: {
                    skjemanavn: erIRedigeringModus ? 'Rediger huskelapp' : 'Opprett huskelapp',
                    skjemaId: 'veilarbvisittkortfs-huskelapp'
                }
            },
            {
                kommentarlengde: values.kommentar?.length,
                fristSatt: !!values.frist?.length
            }
        );

        showSpinnerModal();

        const formValus = {
            kommentar: values.kommentar ? values.kommentar : null,
            frist: values.frist ? dateToISODate(values.frist) : null
        };

        if (erIRedigeringModus) {
            redigerHuskelapp(brukerFnr, formValus)
                .then(ifResponseHasData(setHuskelapp))
                .then(hideModal)
                .catch(showErrorModal);
        } else {
            lagreHuskelapp(brukerFnr, formValus)
                .then(ifResponseHasData(setHuskelapp))
                .then(hideModal)
                .catch(showErrorModal);
        }
    }

    return (
        <Formik key={frist} initialValues={initalValues} onSubmit={handleSubmit}>
            {formikProps => (
                <Modal
                    contentLabel="Huskelapp"
                    className="huskelapp-modal"
                    onRequestClose={() => onRequestClose(formikProps)}
                >
                    <div className="modal-innhold">
                        <div className="modal-info-tekst">
                            <VeilederVerktoyModal tittel={modalTittel}>
                                <HuskelappInformasjonsmelding />
                                <Form>
                                    <HuskelappForm
                                        navn={brukerSammensattNavn}
                                        fnr={brukerFnr}
                                        endringstidspunkt={huskelapp?.endringstidspunkt}
                                        sistEndretAv={huskelapp?.sistEndretAv}
                                    />
                                    <HuskelappFooter
                                        onRequestClose={() => onRequestClose(formikProps)}
                                        slettHuskelapp={showFjernHuskelappModal}
                                        kanFjerneHuskelapp={kanFjernesFraArbeidsliste}
                                    />
                                </Form>
                            </VeilederVerktoyModal>
                        </div>
                    </div>
                </Modal>
            )}
        </Formik>
    );
}

export default HuskelappModal;
