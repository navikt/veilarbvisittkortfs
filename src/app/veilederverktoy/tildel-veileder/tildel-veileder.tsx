import React, { useEffect, useState } from 'react';
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
import './tildel-veileder.less';
import OppfolgingsstatusSelector from '../../../store/oppfolging-status/selectors';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import { HiddenIfDropDown } from '../../components/hidden-if/hidden-if-dropdown';
import { OrNothing } from '../../../types/utils/ornothing';

function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

interface StateProps {
    oppfolgingsenhetId: StringOrNothing;
    veiledere: VeilederData[];
    oppfolgendeVeileder: StringOrNothing;
    skalSkjules: OrNothing<TildelVeilederResponse>;
}

interface DispatchProps {
    hentAlleVeiledereForEnheten: (oppfolgingsenhetId: string) => HentVeilederPaEnhetenAction;
    tildelTilVeileder: (veilederData: TildelVeilederData[]) => TildelVeilederAction;
}

function TildelVeileder(props: StateProps & DispatchProps ) {
    const [selected, changeSelected] = useState('');

    useEffect(() => {
        if (props.oppfolgingsenhetId) {
            props.hentAlleVeiledereForEnheten(props.oppfolgingsenhetId);
        }
    }, []);

    const setValgtVeileder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.tildelTilVeileder([{
            fraVeilederId: props.oppfolgendeVeileder,
            tilVeilederId: selected,
            brukerFnr: personalia.fodselsnummer,
        }]);

    };

    return (
        <HiddenIfDropDown
            knappeTekst={'Tildel veileder'}
            className="input-m tildel-veileder-dropdown"
            name="tildel-veileder-dropdown"
            hidden={!!props.skalSkjules}
            btnClassnames="knapp knapp--standard knapp-fss"
            render={(lukkDropdown) =>
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        setValgtVeileder(event);
                        lukkDropdown();
                    }}
                >
                    <SokFilter
                        data={props.veiledere}
                        label=""
                        placeholder="Søk etter navn eller ident"
                    >
                        {(data) =>
                            <RadioFilterForm
                                data={data}
                                createLabel={settSammenNavn}
                                createValue={(veileder: VeilederData) => veileder.ident}
                                radioName="tildel-veileder"
                                visLukkKnapp={true}
                                selected={selected}
                                changeSelected={(e: React.ChangeEvent<HTMLInputElement>) => changeSelected(e.target.value)}
                                closeDropdown={lukkDropdown}
                            />}
                    </SokFilter>
                </form>
            }
        />
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    oppfolgingsenhetId: OppfolgingsstatusSelector.selectOppfolgingsenhetsId(state),
    veiledere: state.tildelVeileder.veilederPaEnheten.data.veilederListe,
    oppfolgendeVeileder: state.oppfolgingstatus.data.veilederId,
    skalSkjules : state.tildelVeileder.tildeltVeileder.data
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({hentAlleVeiledereForEnheten, tildelTilVeileder}, dispatch);
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(TildelVeileder);
