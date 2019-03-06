import {useEffect, useState} from "react";
import {BehandlandeEnhet, OppgaveTema} from "../../../../../types/oppgave";
import OppgaveApi from "../../../../../api/oppgave-api";
import React from "react";
import OpprettOppgaveTypeSelector from "./opprett-oppgave-type-selector";
import OpprettOppgavePrioritetSelector from "./opprett-oppgave-prioritet-selector";
import OpprettOppgaveVelgDatoer from "./opprett-oppgave-dato-velger";
import OpprettOppgaveVelgEnhet from "./opprett-oppgave-enhet-dropdown";
import {OrNothing} from "../../../../../types/utils/ornothing";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import OpprettOppgaveBeskrivelseTekstArea from "./opprett-oppgave-beskrivelse-textarea";
import HiddenIfDiv from "../../../../components/hidden-if/hidden-if-div";
import {Hovedknapp} from "nav-frontend-knapper";
import {FormattedMessage} from "react-intl";

interface OppgaveInnerForm {
    fnr: string
    tema: OrNothing<OppgaveTema>;
    enhetId: StringOrNothing;
}


function OppgaveInnerForm({fnr, tema, enhetId}: OppgaveInnerForm) {
    const [behandladeEnheter, setBehandladeEnheter] = useState([] as BehandlandeEnhet[]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        if(tema) {
            OppgaveApi.hentBehandlandeEnheter(tema, fnr)
                .then((behandladeEnheter: BehandlandeEnhet[]) => {
                    setBehandladeEnheter(behandladeEnheter);
                    setIsLoading(false);
                });
        }
    },[tema]);

    if(isLoading){
        return <div/>
    }
    return (
        <>
            <OpprettOppgaveTypeSelector/>
            <OpprettOppgavePrioritetSelector/>
            <OpprettOppgaveVelgDatoer/>
            <OpprettOppgaveVelgEnhet
                behandladeEnheter={behandladeEnheter}
                value={enhetId}
            />
            <OpprettOppgaveBeskrivelseTekstArea/>
            <HiddenIfDiv className="modal-footer" hidden = {!tema}>
                <Hovedknapp htmlType="submit" className="knapp knapp--hoved" spinner={false}>
                    <FormattedMessage id="modal.knapp.lagre" />
                </Hovedknapp>
                <button type="button" className="knapp" onClick={()=> "hersp"}>
                    <FormattedMessage id="modal.knapp.avbryt" />
                </button>
            </HiddenIfDiv>
        </>
    )
}


export default OppgaveInnerForm;