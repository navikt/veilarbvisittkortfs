import React from 'react';
import {Innholdstittel, Undertittel} from 'nav-frontend-typografi';
import {Arbeidsliste, ArbeidslisteformValues} from '../../../types/arbeidsliste';
import {FormattedMessage} from 'react-intl';
import {Formik, FormikProps} from 'formik';
import ArbeidslisteForm from './arbeidsliste-form';
import Modal from "../../components/modal/modal";
import ModalHeader from "../../components/modal/modal-header";

interface LeggTilArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    lukkModal: () => void;
    arbeidsliste: Arbeidsliste;
    arbeidslisteStatus: boolean;
    onSubmit: (values: any) => void;

}

function LeggTilArbeidslisteModal(props: LeggTilArbeidslisteProps) {

    const initalValues = {overskrift:  '', kommentar: '', frist: '' };

    const onRequestClose = (formikProps: FormikProps<ArbeidslisteformValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || confirm(dialogTekst)) {
            props.lukkModal();
            formikProps.resetForm();
        }
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
                    onRequestClose={()=> onRequestClose(formikProps)}
                    contentLabel='legg-til-arbeidsliste-modal'
                    className="arbeidsliste-modal"
                    isOpen={props.isOpen}
                >
                    <ModalHeader/>
                    <div className="arbeidsliste-content">
                        <div className="arbeidsliste-info-tekst">
                            <Innholdstittel className="arbeidsliste__overskrift">
                                <FormattedMessage id="arbeidsliste.modal.legg.til.overskrift" />
                            </Innholdstittel>
                            <Undertittel>
                                <FormattedMessage
                                    id="arbeidsliste.modal.personalia"
                                    values={{ navn: props.navn, fnr: props.fnr }}
                                />
                            </Undertittel>
                            <ArbeidslisteForm
                                onRequestClose={() => onRequestClose(formikProps)}
                                laster={props.arbeidslisteStatus}
                            />
                        </div>
                    </div>
                </Modal>
            }
        />

    );
}

export default LeggTilArbeidslisteModal;