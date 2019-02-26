import { deleteAsJson, fetchToJson, postAsJson, putAsJson } from './api-utils';
import { ArbeidslisteformData, ArbeidslisteformDataMedFnr, } from '../types/arbeidsliste';
import { Arbeidsliste } from '../types/arbeidsliste';

export interface ArbeidslisteApi {
    lagreArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteformDataMedFnr) => Promise<Arbeidsliste>;
    fetchArbeidslisteData: (fnr: string) => Promise<Arbeidsliste>;
    slettArbeidsliste: (fnr: string) => Promise<Arbeidsliste>;
    redigerArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteformData) => Promise<Arbeidsliste>;
}

function lagreArbeidsliste (fnr: string, arbeidsliste: ArbeidslisteformDataMedFnr) {
    return postAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}/`, arbeidsliste);
}

function redigerArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformData) {
    return putAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}/`, arbeidsliste);
}

function fetchArbeidslisteData(fnr: string) {
    return fetchToJson(`/veilarbportefolje/api/arbeidsliste/${fnr}/`);
}

export function slettArbeidsliste(fnr: string) {
    return deleteAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}/`);
}

export default {
    lagreArbeidsliste,
    fetchArbeidslisteData,
    slettArbeidsliste,
    redigerArbeidsliste
} as ArbeidslisteApi;