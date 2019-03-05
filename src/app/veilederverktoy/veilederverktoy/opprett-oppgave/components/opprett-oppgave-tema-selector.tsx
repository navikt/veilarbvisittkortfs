import FormikSelect from "../../../../components/formik/formik-select";
import React from "react";
import {OppgaveTema} from "../../../../../types/oppgave";


interface TemaOption {
    value: OppgaveTema | '';
    label: string;
}

function OpprettOppgaveTemaSelector () {
    const temaOptions: TemaOption [] = [
        {value: '', label: 'Velg tema'},
        {value: 'DAGPENGER', label: 'Dagpenger'},
        {value: 'OPPFOLGING', label: 'Oppfølging'},
        {value: 'ARBEIDSAVKLARING', label: 'Arbeidsavklaringspenger'},
        {value: 'INDIVIDSTONAD', label: 'Individstønad (Tiltakspenger)'},
        {value: 'ENSLIG_FORSORGER', label: 'Enslig førsørger'},
        {value: 'TILLEGGSTONAD', label: 'Tilleggsstønad'},
    ];

    return (
        <FormikSelect
            labelId="innstillinger.modal.oppgave-tema-label"
            name="tema"
            options={temaOptions}
        />
    )
}

export default OpprettOppgaveTemaSelector;