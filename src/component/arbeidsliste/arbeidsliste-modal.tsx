import { Form, Formik, FormikProps } from 'formik';
import ArbeidslisteForm from './arbeidsliste-form';
import ArbeidslisteFooter from './arbeidsliste-footer';
import { dateToISODate, toReversedDateStr } from '../../util/date-utils';
import {
    Arbeidsliste,
    ArbeidslisteformValues,
    KategoriModell,
    lagreArbeidsliste,
    redigerArbeidsliste,
    useArbeidsliste
} from '../../api/veilarbportefolje';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { kanFjerneArbeidsliste, selectSammensattNavn } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import { ifResponseHasData } from '../../util/utils';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';
import { ArbeidslisteInformasjonsmelding } from './arbeidsliste-informasjonsmelding';
import { Modal } from '@navikt/ds-react';
import './arbeidsliste.less';

const arbeidslisteEmptyValues = {
    overskrift: '',
    kommentar: '',
    frist: '',
    kategori: KategoriModell.BLA
};

function ArbeidslisteModal() {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { hideModal, showSpinnerModal, showErrorModal, showFjernArbeidslisteModal } = useModalStore();
    const { oppfolging, innloggetVeileder, personalia } = useDataStore();
    const { data: arbeidsliste, mutate: setArbeidsliste } = useArbeidsliste(brukerFnr, visVeilederVerktoy);

    const liste = arbeidsliste as Arbeidsliste;

    const brukerSammensattNavn = selectSammensattNavn(personalia);

    const erIRedigeringModus = !!liste.endringstidspunkt;
    const modalTittel = erIRedigeringModus ? 'Rediger arbeidsliste' : 'Legg i arbeidsliste';
    const frist = liste.frist ? liste.frist.toString() : Date.now().toString();

    const kanFjernesFraArbeidsliste =
        !!arbeidsliste && kanFjerneArbeidsliste(arbeidsliste, oppfolging, innloggetVeileder?.ident);

    const arbeidslisteValues = {
        overskrift: liste.overskrift ?? '',
        kommentar: liste.kommentar ?? '',
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
                    className="arbeidsliste-modal"
                    onClose={() => onRequestClose(formikProps)}
                    open={true}
                    closeOnBackdropClick={true}
                    header={{
                        heading: modalTittel,
                        closeButton: true
                    }}
                >
                    <Modal.Body>
                        <ArbeidslisteInformasjonsmelding />
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
                    </Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default ArbeidslisteModal;
