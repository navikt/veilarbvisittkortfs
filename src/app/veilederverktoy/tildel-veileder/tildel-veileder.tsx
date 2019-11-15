import React, { useEffect, useState } from 'react';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import { VeilederData } from '../../../types/veilederdata';
import { Appstate } from '../../../types/appstate';
import { useDispatch, useSelector } from 'react-redux';
import {
    hentAlleVeiledereForEnheten, tildelTilVeileder
} from '../../../store/tildel-veileder/actions';
import './tildel-veileder.less';
import OppfolgingsstatusSelector from '../../../store/oppfolging-status/selectors';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import Dropdown from '../../components/dropdown/dropdown';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import TilgangTilKontorSelector from '../../../store/tilgang-til-brukerskontor/selector';
import VeilederSelector from '../../../store/tildel-veileder/selector';
import { fjernTildeltVeilederToast } from '../../../store/toast/actions';

function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

interface OwnProps {
    fnr: string;
}

function TildelVeileder({ fnr }: OwnProps) {
    const [selected, changeSelected] = useState('');

    const [query, changeQuery] = useState('');
    const oppfolgingsenhetId: StringOrNothing = useSelector((state: Appstate) =>
        OppfolgingsstatusSelector.selectOppfolgingsenhetsId(state));

    const skjulTildelVeileder: boolean = useSelector((state: Appstate) =>
        !(OppfolgingSelector.selectErUnderOppfolging(state) &&
            TilgangTilKontorSelector.selectHarTilgangTilKontoret(state)));

    const fraVeileder: StringOrNothing = useSelector((state: Appstate) => {
        const tildeltVeileder = VeilederSelector.selectTildeltVeilder(state);
        const oppfolgendeVeileder = OppfolgingSelector.selectVeilederId(state);
        return tildeltVeileder ? tildeltVeileder : oppfolgendeVeileder;
    });

    const veiledere: VeilederData[] = useSelector((state: Appstate) => state.tildelVeileder.veilederPaEnheten.data.veilederListe);

    const dispatch = useDispatch();

    useEffect(() => {
        if (oppfolgingsenhetId) {
            dispatch(hentAlleVeiledereForEnheten(oppfolgingsenhetId));
        }
    }, [oppfolgingsenhetId, dispatch]);

    if (skjulTildelVeileder) {
        return null;
    }

    const setValgtVeileder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        changeQuery('');
        document
            .querySelectorAll('input[type=radio]:checked')
            .forEach(elem => (elem as HTMLInputElement).checked = false);

        dispatch(tildelTilVeileder([{
            fraVeilederId: fraVeileder,
            tilVeilederId: selected,
            brukerFnr: fnr,
        }]));

    };

    return (
        <Dropdown
            metricName="tildel-veileder-trykket"
            knappeTekst={'Tildel veileder'}
            className="input-m tildel-veileder-dropdown background-color-white"
            name="tildel veileder"
            btnClassnames="knapp knapp--standard knapp-fss"
            onLukk={() => changeSelected('')}
            render={(lukkDropdown, settRef) =>
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        dispatch(fjernTildeltVeilederToast());
                        setValgtVeileder(event);
                        lukkDropdown();
                    }}
                >
                    <SokFilter
                        settRef={settRef}
                        data={veiledere}
                        label=""
                        placeholder="Søk navn eller NAV-ident"
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

export default TildelVeileder;
