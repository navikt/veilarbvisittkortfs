import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { AdvarselModal } from '../../components/advarselmodal/advarsel-modal';
import hiddenIf from "../../components/hidden-if/hidden-if";

interface FjernArbeidslisteModal {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (fnr: string) => void;
    fnr: string;
    navn: string;
}

function FjernArbeidslisteModal(props: FjernArbeidslisteModal) {
    return (
        <AdvarselModal
            contentLabel="Fjern fra arbeidslisten"
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
        >
            <div className="modal-info-tekst blokk-s">
                <Innholdstittel className="modal-info-tekst__overskrift">
                    <FormattedMessage id="arbeidsliste.modal.fjern.overskrift" />
                </Innholdstittel>
                <Normaltekst className="modal-info-tekst__undertekst">
                    <FormattedMessage id="arbeidsliste.modal.fjern.infotekst" />
                </Normaltekst>
                <Undertittel>
                    <FormattedMessage
                        id="arbeidsliste.modal.personalia"
                        values={{ navn: props.navn, fnr: props.fnr }}
                    />
                </Undertittel>
            </div>
            <div className="knapper">
                <Hovedknapp
                    htmlType="submit"
                    className="btn--mr1"
                    onClick={() => {
                        props.onSubmit(props.fnr);
                        props.onRequestClose();
                    }}
                >
                    <FormattedMessage id="modal.knapp.fjern" />
                </Hovedknapp>
                <Knapp
                    htmlType="button"
                    onClick={props.onRequestClose}
                >
                    <FormattedMessage id="modal.knapp.avbryt" />
                </Knapp>
            </div>
        </AdvarselModal>
    );
}

export default hiddenIf(FjernArbeidslisteModal);
