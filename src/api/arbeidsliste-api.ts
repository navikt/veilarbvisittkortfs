import { deleteAsJson, fetchToJson, postAsJson } from './api-utils';
import { ArbeidslisteForm } from '../app/veilederverktoy/arbeidsliste/arbeidsliste-form';
import { Arbeidsliste } from '../types/arbeidsliste';

export interface ArbeidslisteApi {
    lagreArbeidsliste: (fnr: string, arbeidsliste: ArbeidslisteForm) => Promise<Arbeidsliste>;
    fetchArbeidslisteData: (fnr: string) => Promise<Arbeidsliste>;
    slettArbeidsliste: (fnr: string) => Promise<Arbeidsliste>;
}

function lagreArbeidsliste (fnr: string, arbeidsliste: ArbeidslisteForm) {
    return postAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}?fnr=${fnr}`, arbeidsliste);
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
    slettArbeidsliste
} as ArbeidslisteApi;