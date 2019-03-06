import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { Arbeidsliste } from '../../../types/arbeidsliste';
import { FormattedMessage } from 'react-intl';
import { Formik, FormikProps } from 'formik';
import NavFrontendModal from 'nav-frontend-modal';
import ArbeidslisteForm from './arbeidsliste-form';

interface LeggTilArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    lukkModal: () => void;
    arbeidsliste: Arbeidsliste;
    arbeidslisteStatus: boolean;
    onSubmit: (values: any) => void;

}

NavFrontendModal.setAppElement("#app");

function LeggTilArbeidslisteModal(props: LeggTilArbeidslisteProps) {

    const initalValues = {overskrift:  '', kommentar: '', frist: '' };

    const onRequestClose = (formikProps: FormikProps<any>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || confirm(dialogTekst)) {
            props.lukkModal();
            formikProps.resetForm();
        }
    };

    return (
        <Formik
            initialValues={initalValues}
            onSubmit={(values, actions) => {
                props.onSubmit(values);
                actions.resetForm();
                props.lukkModal();
            }}
            render={ formikProps =>
                <NavFrontendModal
                    className="visittkortfs-modal arbeidsliste-modal"
                    contentLabel="arbeidsliste"
                    isOpen={props.isOpen}
                    onRequestClose={() => onRequestClose(formikProps)}
                    closeButton={true}
                >
                    <div className="modal-header-wrapper">
                        <header className="modal-header"/>
                    </div>
                    <div className="arbeidsliste__modal">
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
                </NavFrontendModal>
            }
        />

    );
}

export default LeggTilArbeidslisteModal;
