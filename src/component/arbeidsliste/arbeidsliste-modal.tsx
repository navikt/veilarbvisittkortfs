import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Modal from '../components/modal/modal';
import ArbeidslisteForm from './arbeidsliste-form';
import ArbeidslisteFooter from './arbeidsliste-footer';
import VeilederVerktoyModal from '../components/modal/veilederverktoy-modal';
import { dateToISODate, toReversedDateStr } from '../../util/date-utils';
import {
    Arbeidsliste,
    ArbeidslisteformValues,
    KategoriModell,
    lagreArbeidsliste,
    redigerArbeidsliste
} from '../../api/veilarbportefolje';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { kanFjerneArbeidsliste, selectSammensattNavn } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import { ifResponseHasData } from '../../util/utils';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';

const arbeidslisteEmptyValues = {
    overskrift: '',
    kommentar: '',
    frist: '',
    kategori: KategoriModell.BLA
};

function ArbeidslisteModal() {
    const { brukerFnr } = useAppStore();
    const { hideModal, showSpinnerModal, showErrorModal, showFjernArbeidslisteModal } = useModalStore();
    const { arbeidsliste, oppfolging, innloggetVeileder, personalia, setArbeidsliste } = useDataStore();

    const liste = arbeidsliste as Arbeidsliste;

    const brukerSammensattNavn = selectSammensattNavn(personalia);

    const erIRedigeringModus = !!liste.endringstidspunkt;
    const modalTittel = erIRedigeringModus ? 'Rediger arbeidsliste' : 'Legg i arbeidsliste';
    const frist = liste.frist ? liste.frist.toString() : Date.now().toString();

    const kanFjernesFraArbeidsliste =
        !!arbeidsliste && kanFjerneArbeidsliste(arbeidsliste, oppfolging, innloggetVeileder?.ident);

    const arbeidslisteValues = {
        overskrift: liste.overskrift,
        kommentar: liste.kommentar,
        frist: liste.frist ? toReversedDateStr(liste.frist) : '',
        kategori: liste.kategori
    };

    const initalValues = liste.endringstidspunkt ? arbeidslisteValues : arbeidslisteEmptyValues;

    function onRequestClose(formikProps: FormikProps<ArbeidslisteformValues>) {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            hideModal();
            logMetrikk('veilarbvisittkortfs.metrikker.arbeidslistekategori.avbryt');
            formikProps.resetForm();
        }
    }

    function handleSubmit(values: ArbeidslisteformValues) {
        logMetrikk('teamvoff.metrikker.arbeidslistekategori', {
            kategori: values.kategori,
            leggtil: !erIRedigeringModus,
            applikasjon: 'visittkort'
        });

        trackAmplitude(
            {
                name: 'skjema fullført',
                data: {
                    skjemanavn: erIRedigeringModus ? 'Rediger arbeidsliste' : 'Legg til arbeidsliste',
                    skjemaId: 'veilarbvisittkortfs-arbeidsliste'
                }
            },
            {
                kategori: values.kategori,
                overskriftslengde: values.overskrift?.length,
                kommentarlengde: values.kommentar?.length,
                fristSatt: !!values.frist?.length
            }
        );

        showSpinnerModal();

        const formValus: ArbeidslisteformValues = {
            kommentar: values.kommentar ? values.kommentar : null,
            overskrift: values.overskrift ? values.overskrift : null,
            frist: values.frist ? dateToISODate(values.frist) : null,
            kategori: values.kategori
        };

        if (erIRedigeringModus) {
            redigerArbeidsliste(brukerFnr, formValus)
                .then(ifResponseHasData(setArbeidsliste))
                .then(hideModal)
                .catch(showErrorModal);
        } else {
            lagreArbeidsliste(brukerFnr, formValus)
                .then(ifResponseHasData(setArbeidsliste))
                .then(hideModal)
                .catch(showErrorModal);
        }
    }

    return (
        <Formik key={frist} initialValues={initalValues} onSubmit={handleSubmit}>
            {formikProps => (
                <Modal
                    contentLabel="Arbeidsliste"
                    className="arbeidsliste-modal"
                    onRequestClose={() => onRequestClose(formikProps)}
                >
                    <div className="modal-innhold">
                        <div className="modal-info-tekst">
                            <VeilederVerktoyModal tittel={modalTittel}>
                                <Form>
                                    <ArbeidslisteForm
                                        navn={brukerSammensattNavn}
                                        fnr={brukerFnr}
                                        endringstidspunkt={liste.endringstidspunkt}
                                        sistEndretAv={liste.sistEndretAv}
                                    />
                                    <ArbeidslisteFooter
                                        onRequestClose={() => onRequestClose(formikProps)}
                                        slettArbeidsliste={showFjernArbeidslisteModal}
                                        kanFjerneArbeidsliste={kanFjernesFraArbeidsliste}
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

export default ArbeidslisteModal;
