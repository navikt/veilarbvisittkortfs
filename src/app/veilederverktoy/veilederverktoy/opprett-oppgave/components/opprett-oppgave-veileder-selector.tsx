import React from "react";
import SokFilter from "../../../../components/sokfilter/sok-filter";
import FormikRadioGroup from "../../../../components/formik/formik-radiogroup";
import {OrNothing} from "../../../../../types/utils/ornothing";
import {VeilederData} from "../../../../../types/veilederdata";
import {Appstate} from "../../../../../types/appstate";
import {connect} from "react-redux";
import {StringOrNothing} from "../../../../../types/utils/stringornothings";
import Dropdown from "../../../../components/dropdown/dropdown";
import hiddenIf from "../../../../components/hidden-if/hidden-if";

interface OwnProps {
    veilederId: StringOrNothing;
}

interface StateProps{
    veilederListe: VeilederData[];
}

type OpprettOppgaveVelgVeilederProps = OwnProps & StateProps;


function OpprettOppgaveVelgVeileder ({veilederListe, veilederId}: OpprettOppgaveVelgVeilederProps) {

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
                        data={veilederListe}
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


const mapStateToProps= (state: Appstate):StateProps => ({
    veilederListe: state.tildelVeileder.veilederPaEnheten.data.veilederListe
});

export default hiddenIf(connect<StateProps,{},OwnProps>(mapStateToProps)(OpprettOppgaveVelgVeileder));