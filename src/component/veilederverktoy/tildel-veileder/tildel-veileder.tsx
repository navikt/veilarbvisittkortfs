import React, { useState } from 'react';
import SokFilter from '../../components/sokfilter/sok-filter';
import RadioFilterForm from '../../components/radiofilterform/radio-filter-form';
import { VeilederData } from '../../../types/veilederdata';
import { Appstate } from '../../../types/appstate';
import { useDispatch, useSelector } from 'react-redux';
import { tildelTilVeileder } from '../../../store/tildel-veileder/actions';
import './tildel-veileder.less';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import VeilederSelector from '../../../store/tildel-veileder/selector';

import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { navigerAction } from '../../../store/navigation/actions';
import { StringOrNothing } from '../../../util/type/stringornothings';

function settSammenNavn(veileder: VeilederData) {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

function TildelVeileder() {
    const [selected, changeSelected] = useState('');
    const fnr = useSelector(OppfolgingSelector.selectFnr);

    const fraVeileder: StringOrNothing = useSelector((state: Appstate) => {
        const tildeltVeileder = VeilederSelector.selectTildeltVeilder(state);
        const oppfolgendeVeileder = OppfolgingSelector.selectVeilederId(state);
        return tildeltVeileder ? tildeltVeileder : oppfolgendeVeileder;
    });

    const veiledere: VeilederData[] = useSelector(
        (state: Appstate) => state.tildelVeileder.veilederPaEnheten.data.veilederListe
    );

    const sorterVeiledere = veiledere.sort((a, b) => a.etternavn.localeCompare(b.etternavn));

    const dispatch = useDispatch();

    const setValgtVeileder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        document
            .querySelectorAll('input[type=radio]:checked')
            .forEach((elem) => ((elem as HTMLInputElement).checked = false));

        dispatch(
            tildelTilVeileder([
                {
                    fraVeilederId: fraVeileder,
                    tilVeilederId: selected,
                    brukerFnr: fnr,
                },
            ])
        );
        dispatch(navigerAction(null));
    };

    return (
        <VeilederVerktoyModal tittel="Tildel veileder">
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => setValgtVeileder(event)}
                className="tildel-veileder__form"
            >
                <SokFilter data={sorterVeiledere} label="" placeholder="Søk navn eller NAV-ident">
                    {(data) => (
                        <RadioFilterForm
                            data={data}
                            createLabel={settSammenNavn}
                            createValue={(veileder: VeilederData) => veileder.ident}
                            radioName="tildel-veileder"
                            selected={selected}
                            changeSelected={(e: React.ChangeEvent<HTMLInputElement>) => changeSelected(e.target.value)}
                        />
                    )}
                </SokFilter>
                <div className="modal-footer">
                    <Hovedknapp className="btn--mr1" htmlType="submit" disabled={!selected}>
                        Velg
                    </Hovedknapp>
                    <Knapp htmlType="button" onClick={() => dispatch(navigerAction(null))}>
                        Lukk
                    </Knapp>
                </div>
            </form>
        </VeilederVerktoyModal>
    );
}

export default TildelVeileder;
