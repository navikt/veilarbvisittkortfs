import React, { useEffect } from 'react';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import { VeilederData } from '../../../types/veilederdata';
import personalia from '../../../mock/personalia';
import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
    hentAlleVeiledereForEnheten,
    HentVeilederPaEnhetenAction, tildelTilVeileder, TildelVeilederAction
} from '../../../store/tildel-veileder/actions';
import { TildelVeilederData, TildelVeilederResponse } from '../../../types/tildel-veileder';
import OppfolgingsstatusSelector from '../../../store/oppfolging-status/selectors';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import { HiddenIfDropDown } from '../../components/hidden-if/hidden-if-dropdown';
import { OrNothing } from '../../../types/utils/ornothing';
import './tildel-veileder.less';

function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

interface StateProps {
    oppfolgingsenhetId: StringOrNothing;
    veiledere: VeilederData[];
    paloggetVeileder: VeilederData;
    skalSkjules: OrNothing<TildelVeilederResponse>;
}

interface DispatchProps {
    hentAlleVeiledereForEnheten: (oppfolgingsenhetId: string) => HentVeilederPaEnhetenAction;
    tildelTilVeileder: (veilederData: TildelVeilederData[]) => TildelVeilederAction;
}

function TildelVeileder(props: StateProps & DispatchProps ) {
    useEffect(() => {
        if (props.oppfolgingsenhetId) {
            props.hentAlleVeiledereForEnheten(props.oppfolgingsenhetId);
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
        <HiddenIfDropDown
            knappeTekst={'Tildel veileder'}
            className="tildel-veileder-dropdown"
            name="tildel-veileder-dropdown"
            hidden={!!props.skalSkjules}
        >
            <SokFilter
                data={props.veiledere}
                label=""
                placeholder="Søk etter navn eller ident"
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
        </HiddenIfDropDown>);
}

const mapStateToProps = (state: Appstate): StateProps => ({
    oppfolgingsenhetId: OppfolgingsstatusSelector.selectOppfolgingsenhetsId(state),
    veiledere: state.tildelVeileder.veilederPaEnheten.data.veilederListe,
    paloggetVeileder: state.tildelVeileder.paloggetVeileder.data,
    skalSkjules : state.tildelVeileder.tildeltVeileder.data
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({hentAlleVeiledereForEnheten, tildelTilVeileder}, dispatch);
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(TildelVeileder);
