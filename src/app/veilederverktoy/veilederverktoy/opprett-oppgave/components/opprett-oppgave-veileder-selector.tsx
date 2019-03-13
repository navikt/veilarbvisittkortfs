import React, {useEffect, useState} from "react";
import {OppgaveTema} from "../../../../../types/oppgave";
import SokFilter from "../../../../components/sokfilter/sok-filter";
import FormikRadioGroup from "../../../../components/formik/formik-radiogroup";
import {OrNothing} from "../../../../../types/utils/ornothing";
import OppgaveApi from "../../../../../api/oppgave-api";
import {VeilederData, VeilederListe} from "../../../../../types/veilederdata";
import {Appstate} from "../../../../../types/appstate";
import {connect} from "react-redux";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import Dropdown from "../../../../components/dropdown/dropdown";

interface OwnProps {
    oppgaveTema: OrNothing<OppgaveTema>;
    valgtFormEnhet: StringOrNothing;
    fnr: string;
    veilederId: StringOrNothing;
}

interface StateProps{
    enhet: StringOrNothing;
}

type OpprettOppgaveVelgVeilederProps = OwnProps & StateProps;


function OpprettOppgaveVelgVeileder ({oppgaveTema, valgtFormEnhet, enhet, fnr, veilederId}: OpprettOppgaveVelgVeilederProps) {
    const [veilederListe, setVeilederListe] = useState([] as VeilederData[]);
    const [isLoading, setIsLoading] = useState(true);
    const kanHenteVeileder = oppgaveTema === 'OPPFOLGING' && valgtFormEnhet === enhet;

    useEffect(()=> {
        if(kanHenteVeileder && enhet) {
            OppgaveApi
                .hentOppgaveVeileder(fnr, enhet)
                .then((veilederListe: VeilederListe)=> setVeilederListe(veilederListe.veilederListe));
            setIsLoading(false)
        }
    },[oppgaveTema,valgtFormEnhet]);

    if(isLoading || !kanHenteVeileder){
        return <div/>
    }

    const valgtVeileder: OrNothing<VeilederData>  = veilederListe.find(veileder => veileder.ident === veilederId);


    return (
        <div className="skjemaelement">
            <label className="skjemaelement__label">Veileder</label>
            <Dropdown
                name="Velg veileder dropdown"
                knappeTekst={valgtVeileder && valgtVeileder.navn || ''}
                className="skjemaelement velg-enhet-dropdown"
                btnClassnames="velg-enhet-dropdown__button"
                render={(lukkDropdown)=>
                    <SokFilter
                        data={veilederListe || []}
                        label=""
                        placeholder="Søk etter veileder"
                    >
                        {(data) =>
                            <FormikRadioGroup
                                data={data}
                                createLabel={(veileder: VeilederData) => veileder.navn}
                                createValue={(veileder: VeilederData) => veileder.ident}
                                radioName="Velg veileder"
                                closeDropdown={lukkDropdown}
                                name="veilederId"
                            />}
                    </SokFilter>}
            />
        </div>
    )
}


const mapStateToProps= (state: Appstate) => ({
    enhet: state.enhetId.enhet
});

export default connect<StateProps,{},OwnProps>(mapStateToProps)(OpprettOppgaveVelgVeileder);