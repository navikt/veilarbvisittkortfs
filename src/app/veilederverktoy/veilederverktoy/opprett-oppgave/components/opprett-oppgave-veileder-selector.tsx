import React, {useEffect, useState} from "react";
import {HiddenIfDropDown} from "../../../../components/hidden-if/hidden-if-dropdown";
import {OppgaveTema} from "../../../../../types/oppgave";
import SokFilter from "../../../../components/sokfilter/sok-filter";
import FormikRadioGroup from "../../../../components/formik/formik-radiogroup";
import {OrNothing} from "../../../../../types/utils/ornothing";
import OppgaveApi from "../../../../../api/oppgave-api";
import {VeilederData, VeilederListe} from "../../../../../types/veilederdata";
import {Appstate} from "../../../../../types/appstate";
import {connect} from "react-redux";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";

interface OwnProps {
    oppgaveTema: OrNothing<OppgaveTema>;
    valgtFormEnhet: StringOrNothing;
    fnr: string;
}

interface StateProps{
    enhet: StringOrNothing;
}

type OpprettOppgaveVelgVeilederProps = OwnProps & StateProps;


function OpprettOppgaveVelgVeileder ({oppgaveTema, valgtFormEnhet, enhet, fnr}: OpprettOppgaveVelgVeilederProps) {
    const [veilederListeData, setVeilederListe] = useState({} as VeilederListe);
    const [isLoading, setIsLoading] = useState(true);
    const kanHenteVeileder = (oppgaveTema && oppgaveTema === 'OPPFOLGING') &&
        valgtFormEnhet && enhet && valgtFormEnhet === enhet;

    useEffect(()=> {
        if(kanHenteVeileder && enhet) {
            OppgaveApi
                .hentOppgaveVeileder(fnr, enhet)
                .then((veilederListe: VeilederListe)=> setVeilederListe(veilederListe));
            setIsLoading(false)
        }
    },[oppgaveTema,valgtFormEnhet]);

    if(isLoading){
        return <div/>
    }

    return (
        <HiddenIfDropDown
            name="Velg veileder dropdown"
            knappeTekst={""}
            className="skjemaelement velg-enhet-dropdown"
            btnClassnames="velg-enhet-dropdown__button"
            hidden={!kanHenteVeileder}
            render={(lukkDropdown)=>
                <SokFilter
                    data={veilederListeData.veilederListe || []}
                    label=""
                    placeholder="Søk etter enhet"
                >
                    {(data) =>
                        <FormikRadioGroup
                            data={data}
                            createLabel={(veileder: VeilederData) => veileder.navn}
                            createValue={(veileder: VeilederData) => veileder.ident}
                            radioName="Velg veileder"
                            closeDropdown={lukkDropdown}
                            name="enhetId"
                        />}
                </SokFilter>}
        />
    )
}


const mapStateToProps= (state: Appstate) => ({
   enhet: state.enhetId.enhet
});

export default connect<StateProps,{},OwnProps>(mapStateToProps)(OpprettOppgaveVelgVeileder);