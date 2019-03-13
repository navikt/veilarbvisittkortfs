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
            <AlertStripeInfoSolid className="blokk-s">
                Er du sikker på att du vil avslutte oppfølgingsperioden til {navn} ?
            </AlertStripeInfoSolid>
           <div className="modal-footer">
            <Hovedknapp htmlType="submit" className="btn--mr1">
                Bekreft
            </Hovedknapp>
            <Knapp>
                Avbryt
            </Knapp>
           </div>
        </div>
    )
}



export default AvsluttOppfolgingBekreft;