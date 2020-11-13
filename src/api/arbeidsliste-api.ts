import { deleteAsJson, fetchToJson, postAsJson, putAsJson } from './api-utils';
import { Arbeidsliste, ArbeidslisteformValues } from './data/arbeidsliste';

export interface ArbeidslisteApi {
    lagreArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteformValues) => Promise<Arbeidsliste>;
    fetchArbeidslisteData: (fnr: string) => Promise<Arbeidsliste>;
    slettArbeidsliste: (fnr: string) => Promise<Arbeidsliste>;
    redigerArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteformValues) => Promise<Arbeidsliste>;
}

function lagreArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues) {
    return postAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}/`, arbeidsliste);
}

function redigerArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues) {
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
    redigerArbeidsliste,
} as ArbeidslisteApi;
