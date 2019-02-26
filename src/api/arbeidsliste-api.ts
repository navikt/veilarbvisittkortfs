import { deleteAsJson, fetchToJson, postAsJson, putAsJson } from './api-utils';
import { ArbeidslisteForm, ArbeidslisteFormMedFnr } from '../app/veilederverktoy/arbeidsliste/arbeidsliste-form';
import { Arbeidsliste } from '../types/arbeidsliste';

export interface ArbeidslisteApi {
    lagreArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteForm[]) => Promise<Arbeidsliste>;
    fetchArbeidslisteData: (fnr: string) => Promise<Arbeidsliste>;
    slettArbeidsliste: (fnr: string) => Promise<Arbeidsliste>;
    redigerArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteForm) => Promise<Arbeidsliste>;
}

function lagreArbeidsliste (fnr: string, arbeidsliste: ArbeidslisteFormMedFnr[]) {
    return postAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}`, arbeidsliste);
}

function redigerArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteForm) {
    return putAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}`, arbeidsliste);
}

function fetchArbeidslisteData(fnr: string) {
    return fetchToJson(`/veilarbportefolje/api/arbeidsliste/${fnr}?fnr=${fnr}`);
}

export function slettArbeidsliste(fnr: string) {
    return deleteAsJson(`veilarbportefolje/arbeidsliste/${fnr}`);
}

export default {
    lagreArbeidsliste,
    fetchArbeidslisteData,
    slettArbeidsliste,
    redigerArbeidsliste
} as ArbeidslisteApi;