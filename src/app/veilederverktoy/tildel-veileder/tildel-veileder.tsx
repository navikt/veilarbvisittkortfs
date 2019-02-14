import React, {useContext, useEffect, useState} from 'react';
import Dropdown from '../../components/dropdown/dropdown';
import {InitialDataContext} from "../../components/initialdataprovider";
import {hentVeieldere, hentVeieldereForEnhet, tildelTilVeileder} from "../../../api/api";
import SokFilter from "../../components/sokfilter/sok-filter";
import RadioFilterForm from "../../components/radiofilterform/radio-filter-form";
import {VeilederData} from "../../../types/veilederdata";


function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

const initVeilederData: VeilederData= {
    ident: "Z007",
    navn: "James Bond",
    fornavn: "James",
    etternavn: "Bond",
};

export interface TildelVeilederProps {
    fraVeilederId: string,
    tilVeilederId: string,
    brukerFnr: string;
}


function TildelVeileder() {
    const [veiledere, setVeieldereForEnhet] = useState({veilederListe: []});
    const [paloggetVeileder, setPaloggetVeileder] = useState(initVeilederData);
    const {oppfolgingstatus, personalia} = useContext(InitialDataContext);

    useEffect(()=> {
        hentAlleVeiledereForEnheten();
        hentPaLoggetVeileder();
    },[]);

    const hentAlleVeiledereForEnheten = () => {
        const oppfolgingsEnhet = oppfolgingstatus.oppfolgingsenhet.enhetId || "0000";
        hentVeieldereForEnhet(oppfolgingsEnhet).then(setVeieldereForEnhet);
    };

    const hentPaLoggetVeileder = () => {
     hentVeieldere().then(setPaloggetVeileder);
    };

    const setValgtVeileder = (event: any, value:string, closeDropdown: () => void ) => {
        event.preventDefault();
        tildelTilVeileder(personalia.fodselsnummer, [
            {
                fraVeilederId: paloggetVeileder.ident,
                tilVeilederId: value,
                brukerFnr: personalia.fodselsnummer,
            },
        ]);
        closeDropdown();
    };

    return (
        <Dropdown
            knappeTekst={'Tildel veileder'}
            className="input-m tildel-veileder-dropdown"
            name="tildel-veileder-dropdown"
            onLukk={() => 'hello world'}
        >
                <SokFilter<VeilederData>
                    data={veiledere.veilederListe}
                    label=""
                    placeholder=""
                >
                    {(data, radioFilterProps) =>
                        <RadioFilterForm <VeilederData>
                            data={data}
                            onSubmit={setValgtVeileder}
                            createLabel={settSammenNavn}
                            createValue={veileder => veileder.ident}
                            radioName="tildel-veileder"
                            fjernNullstill
                            visLukkKnapp
                            {...radioFilterProps}
                        />}
                </SokFilter>
        </Dropdown>);
}

export default TildelVeileder;