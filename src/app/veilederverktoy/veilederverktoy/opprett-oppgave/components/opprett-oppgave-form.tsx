import React, {useEffect, useState} from 'react';
import HiddenIfDiv from "../../../../components/hidden-if/hidden-if-div";
import {FormikProps} from "formik";
import OppgaveApi from "../../../../../api/oppgave-api";
import {BehandlandeEnhet} from "../../../../../types/oppgave";
import OpprettOppgaveTemaSelector from "./opprett-oppgave-tema-selector";
import OpprettOppgaveTypeSelector from "./opprett-oppgave-type-selector";
import OpprettOppgavePrioritetSelector from "./opprett-oppgave-prioritet-selector";
import OpprettOppgaveVelgDatoer from "./opprett-oppgave-dato-velger";




function OpprettOppgaveForm(props: {formikProps: FormikProps<any>})  {
    const [behandladeEnheter, setBehandladeEnheter] = useState([] as BehandlandeEnhet[]);
    useEffect(()=> {
        OppgaveApi.hentBehandlandeEnheter(props.formikProps.values.tema)
            .then(behandladeEnheter => setBehandladeEnheter(behandladeEnheter));
    },[props.formikProps.values.tema]);
    console.log('behandlandeEnhter', behandladeEnheter);
    return(
       <>
            <OpprettOppgaveTemaSelector/>
           <HiddenIfDiv hidden={!props.formikProps.values.tema}>
               <OpprettOppgaveTypeSelector/>
               <OpprettOppgavePrioritetSelector/>
               <OpprettOppgaveVelgDatoer/>
           </HiddenIfDiv>
        </>
    )
}

export default OpprettOppgaveForm;