import { Appstate } from '../../types/appstate';
import OppfolgingSelector from '../oppfolging/selector';
import { StringOrNothing } from '../../util/type/stringornothings';

export interface VeilederSelector {
    selectVeilederStatus: (state: Appstate) => boolean;
    selectIdentPaloggetVeileder: (state: Appstate) => string;
    selectErOppfolgingsVeileder: (state: Appstate) => boolean;
    selectErTildeltVeilder: (state: Appstate) => boolean;
    selectTildeltVeilder: (state: Appstate) => StringOrNothing;
    selectTildeltVeiledernavn: (state: Appstate) => string;
}

function selectVeilederStatus(state: Appstate): boolean {
    const veilederStatus = state.tildelVeileder.status;
    return veilederStatus === 'NOT_STARTED' || veilederStatus === 'LOADING';
}

function selectIdentPaloggetVeileder(state: Appstate): string {
    return state.tildelVeileder.paloggetVeileder.data.ident;
}

function selectTildeltVeilder(state: Appstate): StringOrNothing {
    const tildeltVeilderData = state.tildelVeileder.tildeltVeileder.data;
    return tildeltVeilderData && tildeltVeilderData.tilVeilederId;
}

function selectVeilederPaEnheten(state: Appstate) {
    return state.tildelVeileder.veilederPaEnheten.data.veilederListe;
}

function selectTildeltVeiledernavn(state: Appstate) {
    const tildeltVeileder = selectTildeltVeilder(state);
    const enhetsVeileder = selectVeilederPaEnheten(state);
    const veilederObjekt = enhetsVeileder.find((v) => v.ident === tildeltVeileder);
    return veilederObjekt ? `${veilederObjekt.etternavn}, ${veilederObjekt!.fornavn}` : '';
}

function selectErOppfolgingsVeileder(state: Appstate): boolean {
    const oppfolgingVeileder = OppfolgingSelector.selectVeilederId(state);
    const inloggedVeileder = selectIdentPaloggetVeileder(state);
    return oppfolgingVeileder ? oppfolgingVeileder === inloggedVeileder : false;
}

function selectErTildeltVeilder(state: Appstate): boolean {
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
    selectTildeltVeiledernavn,
} as VeilederSelector;
