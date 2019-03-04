import { Appstate } from '../../types/appstate';
import OppfolgingsstatusSelector from '../oppfolging-status/selectors';

export interface VeilederSelector {
    selectVeilederStatus: (state: Appstate) => boolean;
    selectIdentPaloggetVeileder: (state: Appstate) => string;
    selectErOppfolgingsVeileder: (state: Appstate) => boolean;
}

function selectVeilederStatus(state: Appstate): boolean {
    const veilederStatus = state.tildelVeileder.status;
    return veilederStatus === 'NOT_STARTED' || veilederStatus === 'LOADING';
}

function selectIdentPaloggetVeileder (state: Appstate): string {
    return state.tildelVeileder.paloggetVeileder.data.ident;
}

function selectErOppfolgingsVeileder(state: Appstate): boolean {
    const oppfolgingVeileder = OppfolgingsstatusSelector.selectOppfolgingsVeileder(state);
    const inloggedVeileder = selectIdentPaloggetVeileder(state);
    return  oppfolgingVeileder ? (oppfolgingVeileder === inloggedVeileder) : false;

}

export default {
    selectVeilederStatus,
    selectIdentPaloggetVeileder,
    selectErOppfolgingsVeileder
}as VeilederSelector;