import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { Arbeidsliste, ArbeidslisteformValues } from '../../../types/arbeidsliste';
import { FormattedMessage } from 'react-intl';
import { Form, Formik, FormikProps } from 'formik';
import ArbeidslisteForm from './arbeidsliste-form';
import Modal from '../../components/modal/modal';
import ModalHeader from '../../components/modal/modal-header';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
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
    const initalValues = {
        overskrift: props.arbeidsliste.overskrift || '',
        kommentar: props.arbeidsliste.kommentar || '',
        frist:   props.arbeidsliste.frist ?
            moment(props.arbeidsliste.frist).format('YYYY-MM-DD') : '' };

    const onRequestClose = (formikProps: FormikProps<ArbeidslisteformValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || confirm(dialogTekst)) {
            props.lukkModal();
            formikProps.resetForm();
        }
    };

    const slettArbeidsliste = (formikProps: FormikProps<ArbeidslisteformValues>) => {
        formikProps.resetForm({frist: '', kommentar: '', overskrift: ''});
        props.lukkModal();
        props.onDelete();
    };
    return (
        <Formik
            initialValues={initalValues}
            onSubmit={(values) => {
                props.onSubmit(values);
                props.lukkModal();
            }}
            render={ formikProps =>
                <Modal
                    contentLabel="Arbeidsliste"
                    isOpen={props.isOpen}
                    className="arbeidsliste-modal"
                    onRequestClose={() => onRequestClose(formikProps)}
                >
                    <ModalHeader/>
                    <div className="modal-innhold">
                        <div className="modal-info-tekst">
                            <Innholdstittel className="modal-info-tekst__overskrift">
                                {!props.arbeidsliste.endringstidspunkt ? 'Legg til i arbeidsliste' : 'Rediger arbeidsliste'}
                            </Innholdstittel>
                            <Undertittel>
                                <FormattedMessage
                                    id="arbeidsliste.modal.personalia"
                                    values={{ navn: props.navn, fnr: props.fnr }}
                                />
                            </Undertittel>
                            <Form>
                                <ArbeidslisteForm
                                    endringstidspunkt={props.arbeidsliste.endringstidspunkt}
                                    sistEndretAv={props.arbeidsliste.sistEndretAv}
                                />
                                <ArbeidslisteFooter
                                    onRequestClose={() => onRequestClose(formikProps)}
                                    spinner={props.arbeidslisteStatus}
                                    slettArbeidsliste={() => slettArbeidsliste(formikProps)}
                                    kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
                                />
                            </Form>
                        </div>
                    </div>
                </Modal>
            }
        />

    );
}

export default ArbeidslisteModal;