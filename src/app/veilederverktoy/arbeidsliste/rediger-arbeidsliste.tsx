import React from 'react';
import {Innholdstittel, Undertittel} from "nav-frontend-typografi";
import ArbeidslisteForm from "./arbeidsliste-form";
import {Arbeidsliste} from "../../../types/arbeidsliste";
import {FormattedMessage} from 'react-intl';


interface RedigerArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    onRequestClose: () => void;
    arbeidsliste: Arbeidsliste;
}


function RedigerArbeidsliste(props: RedigerArbeidslisteProps) {
    return (
        <ArbeidslisteForm
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            arbeidsliste={props.arbeidsliste}
            innholdstittel="Legg i arbeidsliste"
        >
            <Innholdstittel className="arbeidsliste__overskrift">
                <FormattedMessage id="arbeidsliste.modal.rediger.overskrift" />
            </Innholdstittel>
            <Undertittel>
                <FormattedMessage
                    id="arbeidsliste.modal.personalia"
                    values={{ navn: props.navn, fnr: props.fnr }}
                />
            </Undertittel>
        </ArbeidslisteForm>
    )
}

export default RedigerArbeidsliste;