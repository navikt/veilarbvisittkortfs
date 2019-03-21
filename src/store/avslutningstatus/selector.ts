import { Appstate } from '../../types/appstate';
import { FETCH_STATUS } from '../../types/fetch-status';
import { AvslutningStatus } from '../../types/oppfolging';
import { OrNothing } from '../../types/utils/ornothing';
import { StringOrNothing } from '../../types/utils/stringornothings';

export interface AvsluttOppfolgingStatusSelector {
    selectAvsluttOppfolgingIsLoading: (state: Appstate) => boolean;
    selectKanAvslutte: (state: Appstate) => boolean;
    selectAvsluttOppfolgingData: (state: Appstate) => OrNothing<AvslutningStatus>;
    selectBegrunnelse: (state: Appstate) => StringOrNothing;
}

function selectAvsluttOppfolgingStatusStatus (state: Appstate): FETCH_STATUS {
    return state.avsluttOppfolgingStatus.status;
}

function selectAvsluttOppfolgingData (state: Appstate): OrNothing<AvslutningStatus> {
    return state.avsluttOppfolgingStatus.data;
}

function selectAvsluttOppfolgingIsLoading(state: Appstate): boolean {
    const status = selectAvsluttOppfolgingStatusStatus(state);
    return status === 'LOADING';
}

function selectKanAvslutte(state: Appstate): boolean {
    const data = selectAvsluttOppfolgingData(state);
    return !!data && data.kanAvslutte;
}

function selectBegrunnelse(state: Appstate): StringOrNothing {
    return state.avsluttOppfolgingStatus.begrunnelse;
}

export default {
    selectAvsluttOppfolgingIsLoading,
    selectKanAvslutte,
    selectAvsluttOppfolgingData,
    selectBegrunnelse
} as AvsluttOppfolgingStatusSelector;