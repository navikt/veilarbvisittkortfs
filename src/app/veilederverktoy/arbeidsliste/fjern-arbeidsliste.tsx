import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavFrontendModal from 'nav-frontend-modal';

interface FjernArbeidsliste {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (fnr: string) => void;
    fnr: string;
    navn: string;
}

function FjernArbeidsliste(props: FjernArbeidsliste) {
    return(
        <NavFrontendModal
            className="arbeidsliste-modal"
            contentLabel="arbeidsliste"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            closeButton={true}
        >
            <div className="modal-header-wrapper">
                <header className="modal-header"/>
            </div>
            <div className="arbeidsliste__modal">
                <div className="arbeidsliste-info-tekst">
                    <Innholdstittel className="arbeidsliste__overskrift">
                        <FormattedMessage id="arbeidsliste.modal.fjern.overskrift" />
                    </Innholdstittel>
                    <Normaltekst>
                        <FormattedMessage id="arbeidsliste.modal.fjern.infotekst" />
                    </Normaltekst>
                    <Undertittel>
                        <FormattedMessage
                            id="arbeidsliste.modal.personalia"
                            values={{ navn: props.navn, fnr: props.fnr }}
                        />
                    </Undertittel>
                </div>
                <div className="modal-footer">
                    <Hovedknapp
                        htmlType="submit"
                        onClick={() => props.onSubmit(props.fnr)}
                    >
                        <FormattedMessage id="modal.knapp.lagre" />
                    </Hovedknapp>
                    <Knapp
                        htmlType="button"
                        onClick={props.onRequestClose}>
                        <FormattedMessage id="modal.knapp.avbryt" />
                    </Knapp>
                </div>
            </div>
        </NavFrontendModal>
    );
}

export default FjernArbeidsliste;