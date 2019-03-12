import React from 'react';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { Arbeidsliste, ArbeidslisteformValues } from '../../../types/arbeidsliste';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Formik, FormikProps } from 'formik';
import NavFrontendModal from 'nav-frontend-modal';
import ArbeidslisteForm from './arbeidsliste-form';
import moment  from "moment";

interface RedigerArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    lukkModal: () => void;
    arbeidsliste: Arbeidsliste;
    arbeidslisteStatus: boolean;
    onSubmit: (values: ArbeidslisteformValues) => void;

}

function RedigerArbeidslisteModal(props: RedigerArbeidslisteProps & InjectedIntlProps) {

    const initalValues = {
        overskrift:  props.arbeidsliste.overskrift || '',
        kommentar: props.arbeidsliste.kommentar || '',
        frist: props.arbeidsliste.frist ?
            moment(props.arbeidsliste.frist).format('YYYY-MM-DD') : ''} as ArbeidslisteformValues;


    const onRequestClose = (formikProps: FormikProps<ArbeidslisteformValues>) => {
        const dialogTekst = props.intl.formatMessage({
            id: 'lukk-advarsel',
        });
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
                props.lukkModal()}}
            render={formikProps => (
                <NavFrontendModal
                    className="arbeidsliste-modal"
                    contentLabel="Rediger arbeidsliste"
                    isOpen={props.isOpen}
                    onRequestClose={() => onRequestClose(formikProps)}
                    closeButton={true}
                    portalClassName="visittkortfs"
                >
                    <div className="modal-header-wrapper">
                        <header className="modal-header"/>
                    </div>
                    <div className="arbeidsliste-content">
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
                                onRequestClose={() => onRequestClose(formikProps)}
                                laster={props.arbeidslisteStatus}
                                sistEndretAv={props.arbeidsliste.sistEndretAv}
                                endringstidspunkt={props.arbeidsliste.endringstidspunkt}
                            />
                        </div>
                    </div>
                </NavFrontendModal>
            )}
        />

    );
}

export default injectIntl(RedigerArbeidslisteModal);
