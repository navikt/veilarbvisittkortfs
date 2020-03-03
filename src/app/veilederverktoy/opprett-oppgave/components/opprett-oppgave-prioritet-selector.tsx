import FormikSelect from '../../../components/formik/formik-select';
import React from 'react';
import { PrioritetType } from '../../../../types/oppgave';

interface PrioritetOption {
    value: PrioritetType;
    label: string;
}

function OpprettOppgavePrioritetSelector() {
    const typeOptions: PrioritetOption[] = [
        { value: 'LAV', label: 'Lav' },
        { value: 'NORM', label: 'Normal' },
        { value: 'HOY', label: 'Høy' }
    ];

    return (
        <FormikSelect labelId="innstillinger.modal.oppgave-prioritet-label" name="prioritet" options={typeOptions} />
    );
}

export default OpprettOppgavePrioritetSelector;
