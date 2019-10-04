import { Appstate } from '../../types/appstate';
import { StringOrNothing } from '../../types/utils/stringornothings';
import OppfolgingSelector from '../oppfolging/selector';
import { EnhetData } from '../../types/enhet';

export interface VeilederSelector {
    selectVeilederStatus: (state: Appstate) => boolean;
    selectIdentPaloggetVeileder: (state: Appstate) => string;
    selectErOppfolgingsVeileder: (state: Appstate) => boolean;
    selectErTildeltVeilder: (state: Appstate) => boolean;
    selectTildeltVeilder: (state: Appstate) => StringOrNothing;
    selectEnhet: (state: Appstate) => EnhetData;
    selectEnhetNavn: (state: Appstate) => string;
}

function selectVeilederStatus(state: Appstate): boolean {
    const veilederStatus = state.tildelVeileder.status;
    return veilederStatus === 'NOT_STARTED' || veilederStatus === 'LOADING';
}

function selectIdentPaloggetVeileder (state: Appstate): string {
    return state.tildelVeileder.paloggetVeileder.data.ident;
}

function selectEnhet(state: Appstate): EnhetData {
    return state.tildelVeileder.enhet.data;
}

function selectEnhetNavn(state: Appstate): string {
    const enhetData = selectEnhet(state);
    return enhetData && enhetData.navn;
}

function selectTildeltVeilder (state: Appstate): StringOrNothing {
    const tildeltVeilderData = state.tildelVeileder.tildeltVeileder.data;
    return tildeltVeilderData && tildeltVeilderData.tilVeilederId;
}

function selectErOppfolgingsVeileder(state: Appstate): boolean {
    const oppfolgingVeileder = OppfolgingSelector.selectVeilederId(state);
    const inloggedVeileder = selectIdentPaloggetVeileder(state);
    return  oppfolgingVeileder ? (oppfolgingVeileder === inloggedVeileder) : false;

}

function selectErTildeltVeilder (state: Appstate): boolean {
    const tildeltVeileder = selectTildeltVeilder(state);
    const paloggetVeileder = selectIdentPaloggetVeileder(state);
    return tildeltVeileder ? tildeltVeileder === paloggetVeileder : selectErOppfolgingsVeileder(state);
}

export default {
    selectVeilederStatus,
    selectIdentPaloggetVeileder,
    selectErOppfolgingsVeileder,
    selectErTildeltVeilder,
    selectTildeltVeilder,
    selectEnhet,
    selectEnhetNavn,
} as VeilederSelector;