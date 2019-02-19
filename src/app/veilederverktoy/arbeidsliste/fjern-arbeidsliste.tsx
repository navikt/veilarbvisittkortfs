import React from 'react';
import Modal from "../../components/modal/modal";
import ModalHeader from "../../components/modal/modal-header";
import ModalFooter from "../../components/modal/modal-footer";
import ModalContainer from "../../components/modal/modal-container";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {Innholdstittel, Normaltekst, Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";

interface FjernArbeidsliste {
    isOpen: boolean;
    onRequestClose: () => void;
    onBekreft: (fnr: string) => void;
    fnr: string;
    navn: string;
}

function FjernArbeidsliste(props: FjernArbeidsliste){
    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            header={<ModalHeader/>}
            className=''
        >
            <ModalContainer className="arbeidsliste__container">
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
            </ModalContainer>
            <ModalFooter>
                <Hovedknapp onClick={()=> props.onBekreft(props.fnr)}>Slett</Hovedknapp>
                <Knapp onClick={props.onRequestClose}>Avbryt</Knapp>
            </ModalFooter>
        </Modal>
    )
}

export default FjernArbeidsliste;