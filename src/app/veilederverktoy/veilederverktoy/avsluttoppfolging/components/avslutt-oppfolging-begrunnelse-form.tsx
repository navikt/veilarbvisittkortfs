import {Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {AlertStripeInfoSolid} from "nav-frontend-alertstriper";
import {Textarea} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import React from "react";
import {FormikProps} from "formik";

interface OwnProps {
    formikProps: FormikProps<{tekst: string}>
    onHovedKnappClick : ()=> void;
    onAvbryt : ()=> void;
}


type AvsluttOppfolgingBegrunnelseFormProps = OwnProps;

function AvsluttOppfolgingBegrunnelseForm({formikProps, onHovedKnappClick, onAvbryt}: AvsluttOppfolgingBegrunnelseFormProps) {
    return (
        <section className="prosess">
            <Systemtittel>
                Avslutt oppfølgingsperioden
            </Systemtittel>
            <Normaltekst>
                Her avslutter du brukerens oppfølgingsperioden og legger inn en kort begrunnelse
                om hvorfor.
            </Normaltekst>
            <AlertStripeInfoSolid>
                Du kan avslutte oppfølgingsperioden selv om:
                <ul>
                    <li>Brukeren har ubehandlede dialoger</li>
                    <li>Brukeren har aktive saker i Arena</li>
                    <li>Brukeren har aktive tiltak i Arena</li>
                </ul>
            </AlertStripeInfoSolid>
                <Textarea
                    label="Begrunnelse"
                    maxLength={500}
                    value={formikProps.values.tekst}
                    name="tekst"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                />
                <Hovedknapp htmlType="submit" onClick={onHovedKnappClick}>
                    Avslutt oppfølging
                </Hovedknapp>
                <Knapp htmlType="button" onClick={onAvbryt}>
                    Avbryt
                </Knapp>
        </section>
    )
}

export default AvsluttOppfolgingBegrunnelseForm;