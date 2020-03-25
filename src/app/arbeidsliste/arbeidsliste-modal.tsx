import React from 'react';
import { Arbeidsliste, ArbeidslisteformValues, KategoriModell } from '../../types/arbeidsliste';
import { Form, Formik, FormikProps } from 'formik';
import ArbeidslisteForm from './arbeidsliste-form';
import Modal from '../components/modal/modal';
import ModalHeader from '../components/modal/modal-header';
import moment from 'moment';
import ArbeidslisteFooter from './arbeidsliste-footer';
import { logEvent } from '../utils/frontend-logger';

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
                props.onSubmit(values);
                logEvent('teamvoff.metrikker.arbeidslistekategori', {
                    kategori: values.kategori,
                    leggtil: !props.arbeidsliste.endringstidspunkt,
                    applikasjon: 'visittkort'
                });
                props.lukkModal();
            }}
            render={formikProps => (
                <Modal
                    contentLabel="Arbeidsliste"
                    isOpen={props.isOpen}
                    className="arbeidsliste-modal"
                    onRequestClose={() => onRequestClose(formikProps)}
                >
                    <div className="modal-innhold">
                        <ModalHeader
                            tittel={
                                !props.arbeidsliste.endringstidspunkt ? 'Legg i arbeidsliste' : 'Rediger arbeidsliste'
                            }
                        />
                        <div className="modal-info-tekst">
                            <Form>
                                <ArbeidslisteForm
                                    navn={props.navn}
                                    fnr={props.fnr}
                                    endringstidspunkt={props.arbeidsliste.endringstidspunkt}
                                    sistEndretAv={props.arbeidsliste.sistEndretAv}
                                />
                                <ArbeidslisteFooter
                                    onRequestClose={() => onRequestClose(formikProps)}
                                    spinner={props.arbeidslisteStatus}
                                    slettArbeidsliste={props.onDelete}
                                    kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
                                />
                            </Form>
                        </div>
                    </div>
                </Modal>
            )}
        />
    );
}

export default ArbeidslisteModal;
