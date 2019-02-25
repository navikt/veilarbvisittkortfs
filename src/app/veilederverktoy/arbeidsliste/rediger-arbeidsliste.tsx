import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { Arbeidsliste } from '../../../types/arbeidsliste';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import {Formik} from "formik";
import NavFrontendModal from 'nav-frontend-modal';
import ArbeidslisteForm from "./arbeidsliste-form";

interface LeggTilArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    lukkModal: () => void;
    arbeidsliste: Arbeidsliste;
    arbeidslisteStatus: boolean;
    onSubmit: (values: any)=> void;

}

function RedigerArbeidsliste(props: LeggTilArbeidslisteProps & InjectedIntlProps) {

    const initalValues = {
        overskrift:  props.arbeidsliste.overskrift,
        kommentar: props.arbeidsliste.kommentar,
        frist: props.arbeidsliste.frist ? new Date(props.arbeidsliste.frist) : null};

    const onRequestClose = (dirty: boolean) => {
        const dialogTekst = props.intl.formatMessage({
            id: 'arbeidsliste-skjema.lukk-advarsel',
        });
        if (!dirty || confirm(dialogTekst)) {
            props.lukkModal();
        }
    };

    return (
        <Formik
            initialValues={initalValues}
            onSubmit={()=>"HERPS"}
            render={formikProps => (
                <NavFrontendModal
                    className="arbeidsliste-modal"
                    contentLabel="arbeidsliste"
                    isOpen={props.isOpen}
                    onRequestClose={()=> onRequestClose(formikProps.dirty)}
                    closeButton
                >
                    <div className="modal-header-wrapper">
                        <header className="modal-header"/>
                    </div>
                    <div className="arbeidsliste__modal">
                        <div className="arbeidsliste-info-tekst">
                            <Innholdstittel className="arbeidsliste__overskrift">
                                <FormattedMessage id="arbeidsliste.modal.rediger.overskrift" />
                            </Innholdstittel>
                            <Undertittel>
                                <FormattedMessage
                                    id="arbeidsliste.modal.personalia"
                                    values={{ navn: props.navn, fnr: props.fnr }}
                                />
                            </Undertittel>
                            <ArbeidslisteForm
                                onRequestClose={()=>onRequestClose(formikProps.dirty)}
                                laster={props.arbeidslisteStatus}
                            />
                        </div>
                    </div>
                </NavFrontendModal>
            )}
        />

    )
}



export default injectIntl(RedigerArbeidsliste);