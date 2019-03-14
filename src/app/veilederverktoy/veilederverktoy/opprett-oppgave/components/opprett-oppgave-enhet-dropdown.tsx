import React, {useEffect, useState} from "react";
import {HiddenIfDropDown} from "../../../../components/hidden-if/hidden-if-dropdown";
import {BehandlandeEnhet, OppgaveTema} from "../../../../../types/oppgave";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import SokFilter from "../../../../components/sokfilter/sok-filter";
import FormikRadioGroup from "../../../../components/formik/formik-radiogroup";
import {OrNothing} from "../../../../../types/utils/ornothing";
import OppgaveApi from "../../../../../api/oppgave-api";

interface OpprettOppgaveVelgEnhet {
    tema: OrNothing<OppgaveTema>;
    value: StringOrNothing;
    fnr: string;
}

function OpprettOppgaveVelgEnhet ({value, tema, fnr}: OpprettOppgaveVelgEnhet) {
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

    const valgtEnhet: OrNothing<BehandlandeEnhet> = behandladeEnheter.find(enhet => enhet.enhetId === value) || behandladeEnheter [0];
    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Enhet*</label>
            <HiddenIfDropDown
                name="Velg enhet dropdown"
                knappeTekst={`${valgtEnhet.enhetId} ${valgtEnhet.navn}`}
                className="velg-enhet-dropdown"
                btnClassnames="velg-enhet-dropdown__button"
                render={(lukkDropdown)=>
                    <SokFilter
                        data={behandladeEnheter}
                        label=""
                        placeholder="Søk etter enhet"
                    >
                        {(data) =>
                            <FormikRadioGroup
                                defaultValue={behandladeEnheter[0].enhetId}
                                data={data}
                                createLabel={(behandlandeEnhet: BehandlandeEnhet) => `${behandlandeEnhet.enhetId} ${behandlandeEnhet.navn}`}
                                createValue={(behandlandeEnhet: BehandlandeEnhet) => behandlandeEnhet.enhetId}
                                radioName="Velg enhet"
                                closeDropdown={lukkDropdown}
                                name="enhetId"
                            />
                        }
                    </SokFilter>}
            />
        </div>
    )
}

export default OpprettOppgaveVelgEnhet;