import FormikSelect from "../../../../components/formik/formik-select";
import React from "react";
import {OppgaveType} from "../../../../../types/oppgave";


interface TypeOption {
    value: OppgaveType ;
    label: string;
}

function OpprettOppgaveTypeSelector () {
    const typeOptions: TypeOption [] = [
        {value: 'VURDER_HENVENDELSE', label: 'Vurder henvendelse'},
        {value: 'VURDER_KONSEKVENS_FOR_YTELSE', label: 'Vurder konsekvens for ytelse'},
    ];

    return (
        <FormikSelect
            labelId="innstillinger.modal.oppgave-type-label"
            name="type"
            options={typeOptions}
        />
    )
}

export default OpprettOppgaveTypeSelector;