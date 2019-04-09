import React, { useEffect, useState } from 'react';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import { VeilederData } from '../../../types/veilederdata';
import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
    hentAlleVeiledereForEnheten,
    HentVeilederPaEnhetenAction, tildelTilVeileder, TildelVeilederAction
} from '../../../store/tildel-veileder/actions';
import { TildelVeilederData } from '../../../types/tildel-veileder';
import './tildel-veileder.less';
import OppfolgingsstatusSelector from '../../../store/oppfolging-status/selectors';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import Dropdown from '../../components/dropdown/dropdown';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import TilgangTilKontorSelector from '../../../store/tilgang-til-brukerskontor/selector';

function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

interface StateProps {
    oppfolgingsenhetId: StringOrNothing;
    veiledere: VeilederData[];
    oppfolgendeVeileder: StringOrNothing;
    skjulTildelVeileder: boolean;
}

interface DispatchProps {
    hentAlleVeiledereForEnheten: (oppfolgingsenhetId: string) => HentVeilederPaEnhetenAction;
    tildelTilVeileder: (veilederData: TildelVeilederData[]) => TildelVeilederAction;
}

interface OwnProps {
    fnr: string;
}

type TildelVeilederProps = StateProps & DispatchProps & OwnProps;

function TildelVeileder(props: TildelVeilederProps) {
    if (props.skjulTildelVeileder) {
        return null;
    }
    const [selected, changeSelected] = useState('');
    const [query, changeQuery] = useState('');

    useEffect(() => {
        if (props.oppfolgingsenhetId) {
            props.hentAlleVeiledereForEnheten(props.oppfolgingsenhetId);
        }
    }, []);

    const setValgtVeileder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        changeQuery('');
        document
            .querySelectorAll('input[type=radio]:checked')
            .forEach(elem => (elem as HTMLInputElement).checked = false);

        props.tildelTilVeileder([{
            fraVeilederId: props.oppfolgendeVeileder,
            tilVeilederId: selected,
            brukerFnr: props.fnr,
        }]);

    };

    return (
        <Dropdown
            metricName="tildel-veileder-trykket"
            knappeTekst={'Tildel veileder'}
            className="input-m tildel-veileder-dropdown background-color-white"
            name="tildel veileder"
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
                        query={query}
                        changeQuery={changeQuery}
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
    skjulTildelVeileder:
        !(OppfolgingSelector.selectErUnderOppfolging(state) &&
        TilgangTilKontorSelector.selectHarTilgangTilKontoret(state))
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({hentAlleVeiledereForEnheten, tildelTilVeileder}, dispatch);
};

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(TildelVeileder);
