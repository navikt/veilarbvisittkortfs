import React from 'react';
import { Arbeidsliste, ArbeidslisteformValues, KategoriModell } from '../../types/arbeidsliste';
import { Form, Formik, FormikProps } from 'formik';
import Modal from '../components/modal/modal';
import moment from 'moment';
import { logEvent } from '../utils/frontend-logger';
import NavFrontendSpinner from 'nav-frontend-spinner';
import ArbeidslisteForm from './arbeidsliste-form';
import ArbeidslisteFooter from './arbeidsliste-footer';

interface ArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    lukkModal: () => void;
    arbeidsliste: Arbeidsliste;
    arbeidslisteStatus: boolean;
    onSubmit: (values: any) => void;
    onDelete: () => void;
    kanFjerneArbeidsliste: boolean;
}

function ArbeidslisteModal(props: ArbeidslisteProps) {
    const arbeidslisteEmptyValues = {
        overskrift: '',
        kommentar: '',
        frist: '',
        kategori: KategoriModell.BLA
    };

    const arbeidslisteValues = {
        overskrift: props.arbeidsliste.overskrift,
        kommentar: props.arbeidsliste.kommentar,
        frist: props.arbeidsliste.frist ? moment(props.arbeidsliste.frist).format('YYYY-MM-DD') : '',
        kategori: props.arbeidsliste.kategori
    };

    const initalValues = !props.arbeidsliste.endringstidspunkt ? arbeidslisteEmptyValues : arbeidslisteValues;

    const onRequestClose = (formikProps: FormikProps<ArbeidslisteformValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            props.lukkModal();
            logEvent('veilarbvisittkortfs.metrikker.arbeidslistekategori.avbryt');
            formikProps.resetForm();
        }
    };

    return (
        <Formik
            key={props.arbeidsliste.frist ? props.arbeidsliste.frist.toString() : Date.now().toString()}
            initialValues={initalValues}
            onSubmit={values => {
                props.lukkModal();
                props.onSubmit(values);
                logEvent('teamvoff.metrikker.arbeidslistekategori', {
                    kategori: values.kategori,
                    leggtil: !props.arbeidsliste.endringstidspunkt,
                    applikasjon: 'visittkort'
                });
            }}
            render={formikProps => (
                <Modal
                    contentLabel="Arbeidsliste"
                    isOpen={props.isOpen}
                    className="arbeidsliste-modal"
                    onRequestClose={() => onRequestClose(formikProps)}
                >
                    <div className="modal-innhold">
                        <div className="modal-info-tekst">
                            <Form>
                                {props.arbeidslisteStatus ? (
                                    <div className="arbeidsliste-modal__spinner-wrapper">
                                        <NavFrontendSpinner transparent type="XXL" />
                                    </div>
                                ) : (
                                    <>
                                        <ArbeidslisteForm
                                            navn={props.navn}
                                            fnr={props.fnr}
                                            endringstidspunkt={props.arbeidsliste.endringstidspunkt}
                                            sistEndretAv={props.arbeidsliste.sistEndretAv}
                                            tittel={
                                                !props.arbeidsliste.endringstidspunkt
                                                    ? 'Legg i arbeidsliste'
                                                    : 'Rediger arbeidsliste'
                                            }
                                        />
                                        <ArbeidslisteFooter
                                            onRequestClose={() => onRequestClose(formikProps)}
                                            slettArbeidsliste={props.onDelete}
                                            kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
                                        />
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </Modal>
            )}
        />
    );
}

export default ArbeidslisteModal;
