import React from "react";
import {HiddenIfDropDown} from "../../../../components/hidden-if/hidden-if-dropdown";
import {BehandlandeEnhet} from "../../../../../types/oppgave";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import SokFilter from "../../../../components/sokfilter/sok-filter";
import FormikRadioGroup from "../../../../components/formik/formik-radiogroup";
import {OrNothing} from "../../../../../types/utils/ornothing";

interface OpprettOppgaveVelgEnhet {
    behandladeEnheter: BehandlandeEnhet[];
    value: StringOrNothing;
}


function OpprettOppgaveVelgEnhet ({behandladeEnheter, value}: OpprettOppgaveVelgEnhet) {

    const valgtEnhet: OrNothing<BehandlandeEnhet> = behandladeEnheter.find(enhet => enhet.enhetId === value);

    return (
        <HiddenIfDropDown
            name="Velg enhet dropdown"
            knappeTekst={(valgtEnhet && valgtEnhet.navn) || behandladeEnheter[0].navn}
            className="skjemaelement velg-enhet-dropdown"
            btnClassnames="velg-enhet-dropdown__button"
            render={(lukkDropdown)=>
                <SokFilter
                    data={behandladeEnheter}
                    label=""
                    placeholder="Søk etter enhet"
                >
                    {(data) =>
                        <FormikRadioGroup
                            data={data}
                            createLabel={(behandlandeEnhet: BehandlandeEnhet) => behandlandeEnhet.navn}
                            createValue={(behandlandeEnhet: BehandlandeEnhet) => behandlandeEnhet.enhetId}
                            radioName="Velg enhet"
                            closeDropdown={lukkDropdown}
                            name="enhetId"
                        />}
                </SokFilter>}
        />
    )
}

export default OpprettOppgaveVelgEnhet;