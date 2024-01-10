import React from 'react';
import FormikSelect from '../../../components/formik/formik-select';
import { PrioritetType } from '../../../../api/veilarboppgave';

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

    return <FormikSelect label="Prioritet" name="prioritet" options={typeOptions} />;
}

export default OpprettOppgavePrioritetSelector;
