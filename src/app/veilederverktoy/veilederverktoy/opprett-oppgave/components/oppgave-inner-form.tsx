import { OppgaveTema} from "../../../../../types/oppgave";
import React from "react";
import OpprettOppgaveTypeSelector from "./opprett-oppgave-type-selector";
import OpprettOppgavePrioritetSelector from "./opprett-oppgave-prioritet-selector";
import OpprettOppgaveVelgDatoer from "./opprett-oppgave-dato-velger";
import OpprettOppgaveVelgEnhet from "./opprett-oppgave-enhet-dropdown";
import OpprettOppgaveVelgVeileder from "./opprett-oppgave-veileder-selector";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import OpprettOppgaveBeskrivelseTekstArea from "./opprett-oppgave-beskrivelse-textarea";
import HiddenIfDiv from "../../../../components/hidden-if/hidden-if-div";
import {Hovedknapp} from "nav-frontend-knapper";
import {FormattedMessage} from "react-intl";
import {OrNothing} from "../../../../../types/utils/ornothing";
import {FormikProps} from "formik";
import {OpprettOppgaveFormValues} from "../opprett-oppgave";

interface OppgaveInnerForm {
    fnr: string
    tema: OrNothing<OppgaveTema>;
    enhetId: StringOrNothing;
    veilederId: StringOrNothing;
    avsenderenhetId: StringOrNothing;
    formikProps: FormikProps<OpprettOppgaveFormValues>
}


function OppgaveInnerForm({fnr, tema, enhetId, veilederId, avsenderenhetId, formikProps}: OppgaveInnerForm) {
    if(!tema){
        return null;
    }

    return (
        <>
        <OpprettOppgaveTypeSelector oppgaveTema={tema}/>
        <OpprettOppgavePrioritetSelector/>
        <OpprettOppgaveVelgDatoer/>
        <div className="sentrert">
            <OpprettOppgaveVelgEnhet
                value={enhetId}
                tema={tema}
                fnr={fnr}
                formikProps={formikProps}
            />
            <OpprettOppgaveVelgVeileder
                hidden={!(avsenderenhetId===enhetId && tema==='OPPFOLGING')}
                veilederId={veilederId}
            />
        </div>
        <OpprettOppgaveBeskrivelseTekstArea/>
        <HiddenIfDiv className="modal-footer" hidden = {!tema}>
            <Hovedknapp className="btn--mr1" htmlType="submit" spinner={false}>
                Bekreft
            </Hovedknapp>
            <button type="button" className="knapp" onClick={()=> "hersp"}>
                <FormattedMessage id="modal.knapp.avbryt" />
            </button>
        </HiddenIfDiv>
        </>
    )
}


export default OppgaveInnerForm;