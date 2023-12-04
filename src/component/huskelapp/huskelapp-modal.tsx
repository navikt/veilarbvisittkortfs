import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
//import Modal from '../components/modal/modal';
import { HuskelappformValues, lagreHuskelapp, redigerHuskelapp, slettArbeidsliste } from '../../api/veilarbportefolje';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { kanFjerneHuskelapp, selectSammensattNavn } from '../../util/selectors';
import { useModalStore } from '../../store/modal-store';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';
import { HuskelappInformasjonsmelding } from './huskelapp-informasjonsmelding';
import HuskelappForm from './huskelapp-form';
import HuskelappFooter from './huskelapp-footer';
import { EksisterendeArbeidsliste } from './eksisterendeArbeidsliste';
import './huskelapp.less';
import { Heading, Modal } from '@navikt/ds-react';
import { ReactComponent as HuskelappIkon } from './ikon/huskelapp.svg';

const huskelappEmptyValues = {
    huskelappId: null,
    kommentar: '',
    frist: ''
};

function HuskelappModal() {
    const { brukerFnr, enhetId } = useAppStore();
    const { arbeidsliste } = useDataStore();
    const {
        hideModal,
        showSpinnerModal,
        showErrorModal,
        showFjernArbeidslisteModal: showFjernHuskelappModal
    } = useModalStore();
    const { huskelapp, oppfolging, innloggetVeileder, personalia } = useDataStore();

    const brukerSammensattNavn = selectSammensattNavn(personalia);

    const erIRedigeringModus = huskelapp?.endretDato;

    const kanFjernesFraArbeidsliste =
        !!huskelapp && kanFjerneHuskelapp(huskelapp, oppfolging, innloggetVeileder?.ident);

    const huskelappValues: HuskelappformValues = {
        huskelappId: huskelapp?.huskelappId ? huskelapp.huskelappId : null,
        kommentar: huskelapp?.kommentar ?? '',
        frist: huskelapp?.frist ? huskelapp.frist.toLocaleDateString() : null
    };

    const initalValues: HuskelappformValues = huskelapp?.endretDato ? huskelappValues : huskelappEmptyValues;

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
                fristSatt: !!values.frist?.toString().length
            }
        );

        showSpinnerModal();

        if (erIRedigeringModus) {
            redigerHuskelapp({
                huskelappId: values.huskelappId ? values.huskelappId : null,
                kommentar: values.kommentar ? values.kommentar : null,
                frist: values.frist ? values.frist : null,
                brukerFnr: brukerFnr,
                enhetId: enhetId
            })
                .then(hideModal)
                .catch(showErrorModal);
        } else {
            lagreHuskelapp({
                kommentar: values.kommentar ? values.kommentar : null,
                frist: values.frist ? values.frist : null,
                brukerFnr: brukerFnr,
                enhetId: enhetId
            })
                .then(hideModal)
                .catch(showErrorModal);
            slettArbeidsliste(brukerFnr);
        }
    }

    return (
        <Formik key={brukerFnr} initialValues={initalValues} onSubmit={handleSubmit}>
            {formikProps => (
                <Modal
                    header={{
                        icon: <HuskelappIkon aria-hidden />,
                        heading: 'Huskelapp',
                        size: 'small'
                    }}
                    open={true}
                    onClose={() => onRequestClose(formikProps)}
                >
                    <Modal.Body>
                        <div className={'huskelappmodal-innhold'}>
                            <div className={'huskelapp-innhold'}>
                                <Heading size={'medium'} visuallyHidden={true}>
                                    Huskelappinnhold
                                </Heading>
                                {/* TODO: ask Mathias about screen reader only component so we can add header for huskelapp  */}
                                <HuskelappInformasjonsmelding />
                                <Form>
                                    <HuskelappForm
                                        navn={brukerSammensattNavn}
                                        fnr={brukerFnr}
                                        endringstidspunkt={huskelapp?.endretDato}
                                    />
                                </Form>
                            </div>
                            <div className={'arbeidslisteInnhold'}>
                                <EksisterendeArbeidsliste arbeidsliste={arbeidsliste} />
                            </div>
                        </div>
                        <HuskelappFooter
                            onRequestClose={() => onRequestClose(formikProps)}
                            slettHuskelapp={showFjernHuskelappModal}
                            kanFjerneHuskelapp={kanFjernesFraArbeidsliste}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default HuskelappModal;
