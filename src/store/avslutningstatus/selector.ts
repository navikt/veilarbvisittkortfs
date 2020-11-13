import { Appstate } from '../../types/appstate';
import { StringOrNothing } from '../../util/type/stringornothings';
import { OrNothing } from '../../util/type/ornothing';
import { AvslutningStatus } from '../../api/data/oppfolging';
import { FETCH_STATUS } from '../../api/data/fetch-status';

export interface AvsluttOppfolgingStatusSelector {
    selectAvsluttOppfolgingIsLoading: (state: Appstate) => boolean;
    selectKanAvslutte: (state: Appstate) => boolean;
    selectAvsluttOppfolgingData: (state: Appstate) => OrNothing<AvslutningStatus>;
    selectBegrunnelse: (state: Appstate) => StringOrNothing;
}

function selectAvsluttOppfolgingStatusStatus(state: Appstate): FETCH_STATUS {
    return state.avsluttOppfolgingStatus.status;
}

function selectAvsluttOppfolgingData(state: Appstate): OrNothing<AvslutningStatus> {
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
    selectBegrunnelse,
} as AvsluttOppfolgingStatusSelector;
