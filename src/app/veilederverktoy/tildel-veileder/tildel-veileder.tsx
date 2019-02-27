import React, { useEffect } from 'react';
import Dropdown from '../../components/dropdown/dropdown';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import { VeilederData } from '../../../types/veilederdata';
import personalia from '../../../mock/personalia';
import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
    hentAlleVeiledereForEnheten,
    hentPaloggetVeileder, HentPaloggetVeilederAction,
    HentVeilederPaEnhetenAction, tildelTilVeileder, TildelVeilederAction
} from '../../../store/tildel-veileder/actions';
import { TildelVeilederData } from '../../../types/tildel-veileder';
import './tildel-veileder.less';
import OppfolgingsstatusSelector from "../../../store/oppfolging-status/selectors";
import {StringOrNothing} from "../../../types/utils/stringornothings";

function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

interface StateProps {
    oppfolgingsenhetId: StringOrNothing;
    veiledere: VeilederData[];
    paloggetVeileder: VeilederData;
}

interface DispatchProps {
    hentAlleVeiledereForEnheten: (oppfolgingsenhetId: string) => HentVeilederPaEnhetenAction;
    hentPaloggetVeileder: () => HentPaloggetVeilederAction;
    tildelTilVeileder: (veilederData: TildelVeilederData[]) => TildelVeilederAction;
}

function TildelVeileder(props: StateProps & DispatchProps ) {
    useEffect(() => {
        if(props.oppfolgingsenhetId) {
            props.hentAlleVeiledereForEnheten(props.oppfolgingsenhetId);
            props.hentPaloggetVeileder();
        }
    }, []);

    const setValgtVeileder = (event: React.FormEvent<HTMLFormElement>, value: string, closeDropdown: () => void ) => {
        event.preventDefault();
        if (props.paloggetVeileder) {
            props.tildelTilVeileder([{
                    fraVeilederId: props.paloggetVeileder.ident,
                    tilVeilederId: value,
                    brukerFnr: personalia.fodselsnummer,
                }]);
        }
        closeDropdown();
    };

    return (
        <Dropdown
            knappeTekst={'Tildel veileder'}
            className="input-m tildel-veileder-dropdown"
            name="tildel-veileder-dropdown"
        >
            <SokFilter
                data={props.veiledere}
                label=""
                placeholder=""
            >
                {(data, radioFilterProps) =>
                    <RadioFilterForm
                        data={data}
                        onSubmit={setValgtVeileder}
                        createLabel={settSammenNavn}
                        createValue={(veileder: VeilederData) => veileder.ident}
                        radioName="tildel-veileder"
                        visLukkKnapp={true}
                        {...radioFilterProps}
                    />}
            </SokFilter>
        </Dropdown>);
}

const mapStateToProps = (state: Appstate): StateProps => ({
    oppfolgingsenhetId: OppfolgingsstatusSelector.selectOppfolgingsenhetsId(state),
    veiledere: state.tildelVeileder.veilederPaEnheten.data.veilederListe,
    paloggetVeileder: state.tildelVeileder.paloggetVeileder.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({hentPaloggetVeileder, hentAlleVeiledereForEnheten, tildelTilVeileder}, dispatch);
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(TildelVeileder);