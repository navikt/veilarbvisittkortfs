import React from 'react';
import {AlertStripeInfoSolid} from "nav-frontend-alertstriper";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";


interface OwnProps {
    navn: string;
}

type AvsluttOppfolgingBekreftelseModalProps = OwnProps;


function AvsluttOppfolgingBekreft ({navn}: AvsluttOppfolgingBekreftelseModalProps) {

    return (
        <div className="prosess">
            <AlertStripeInfoSolid>
                Er du sikker på att du vil avslutte oppfølgingsperioden til {navn} ?
            </AlertStripeInfoSolid>
            <Hovedknapp htmlType="submit">
                Bekreft
            </Hovedknapp>
            <Knapp>
                Avbryt
            </Knapp>
        </div>
    )
}



export default AvsluttOppfolgingBekreft;