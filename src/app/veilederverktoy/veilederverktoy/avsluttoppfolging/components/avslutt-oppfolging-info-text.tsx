import {Normaltekst} from "nav-frontend-typografi";
import {AlertStripeInfoSolid} from "nav-frontend-alertstriper";
import React from "react";
import {AvslutningStatus} from "../../../../../types/oppfolging";
import {OrNothing} from "../../../../../types/utils/ornothing";

export function AvsluttOppfolgingInfoText(props: {avslutningStatus: OrNothing<AvslutningStatus>}) {
    if(!props.avslutningStatus){
      return null;
    }

    const {harTiltak, harYtelser} = props.avslutningStatus;
    return (
        <>
            <Normaltekst>
                Her avslutter du brukerens oppfølgingsperioden og legger inn en kort begrunnelse
                om hvorfor.
            </Normaltekst>
            <AlertStripeInfoSolid>
                Du kan avslutte oppfølgingsperioden selv om:
                <ul className="margin--0">
                    <li>Brukeren har ubehandlede dialoger</li>
                    {harTiltak && <li>Brukeren har aktive saker i Arena</li>}
                    {harYtelser && <li>Brukeren har aktive tiltak i Arena</li>}
                </ul>
            </AlertStripeInfoSolid>
        </>
    )
}