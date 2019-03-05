import React from "react";
import {HiddenIfDropDown} from "../../../../components/hidden-if/hidden-if-dropdown";
import {BehandlandeEnhet} from "../../../../../types/oppgave";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import SokFilter from "../../../../components/sokfilter/sok-filter";
import FormikRadioFilter from "../../../../components/formik/formik-radiofilter";
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
            render={(lukkDropdown)=>
                <SokFilter
                    data={behandladeEnheter}
                    label=""
                    placeholder="Søk etter enhet"
                >
                    {(data) =>
                        <FormikRadioFilter
                            data={data}
                            createLabel={(behandlandeEnhet: BehandlandeEnhet) => behandlandeEnhet.navn}
                            createValue={(behandlandeEnhet: BehandlandeEnhet) => behandlandeEnhet.enhetId}
                            radioName="Velg enhet"
                            visLukkKnapp={true}
                            closeDropdown={lukkDropdown}
                            name="enhetId"
                        />}
                </SokFilter>}
        />
    )
}

export default OpprettOppgaveVelgEnhet;