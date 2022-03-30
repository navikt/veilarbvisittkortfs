import { AxiosPromise, AxiosResponse } from 'axios';
import { axiosInstance } from './utils';
import { StringOrNothing } from '../util/type/stringornothings';

export enum Egenskaper {
    ESKALERINGSVARSEL,
    PARAGRAF8
}

type Avsender = 'VEILEDER' | 'BRUKER';

interface Henvendelse {
    avsender: Avsender;
    avsenderId: string;
    dialogId: string;
    id: string;
    lest: boolean;
    sendt: string; //TODO DATO
    tekst: string;
}

export interface Dialog {
    aktvitetId: StringOrNothing;
    egenskaper: Egenskaper[];
    erLestAvBruker: boolean;
    ferdigBehandlet: boolean;
    henvendelser: Henvendelse[];
    historisk: boolean;
    id: string;
    lest: boolean;
    lestAvBrukerTidspunkt: StringOrNothing;
    opprettetDato: string;
    overskrift: string;
    sisteDato: string;
    sisteTekst: string;
    venterPaSvar: boolean;
}

export interface HenvendelseData {
    begrunnelse: string;
    egenskaper: Egenskaper[];
    overskrift?: string;
    tekst: string;
    dialogId?: string;
}

export interface StartEskaleringRequest {
    fnr: string;
    begrunnelse: string;
    overskrift: string;
    tekst: string;
}

export interface StopEskaleringRequest {
    fnr: string;
    begrunnelse: string;
    skalSendeHenvendelse: boolean;
}

export interface GjeldendeEskaleringsvarsel {
    id: number;
    tilhorendeDialogId: number;
    opprettetAv: string;
    opprettetDato: string;
    opprettetBegrunnelse: string;
}

export interface EskaleringsvarselHistorikkInnslag {
    id: number;
    tilhorendeDialogId: number;

    opprettetAv: string;
    opprettetDato: string;
    opprettetBegrunnelse: string;

    avsluttetDato: string | null;
    avsluttetAv: string | null;
    avsluttetBegrunnelse: string | null;
}

export function oppdaterFerdigbehandlet(
    dialogId: string,
    erFerdigbehandlet: boolean,
    fnr: string
): Promise<AxiosResponse> {
    return axiosInstance.put(`/veilarbdialog/api/dialog/${dialogId}/ferdigbehandlet/${erFerdigbehandlet}?fnr=${fnr}`);
}

export function oppdaterVenterPaSvar(dialogId: string, venterPaSvar: boolean, fnr: string): AxiosPromise {
    return axiosInstance.put(`/veilarbdialog/api/dialog/${dialogId}/venter_pa_svar/${venterPaSvar}?fnr=${fnr}`);
}

export function fetchDialoger(fnr: string): AxiosPromise<Dialog[]> {
    return axiosInstance.get<Dialog[]>(`/veilarbdialog/api/dialog?fnr=${fnr}`);
}

export function nyHenvendelse(fnr: string, henvendelse: HenvendelseData): AxiosPromise<Dialog> {
    return axiosInstance.post(`/veilarbdialog/api/dialog?fnr=${fnr}`, henvendelse);
}

export function hentGjeldendeEskaleringsvarsel(fnr: string): AxiosPromise<GjeldendeEskaleringsvarsel> {
    return axiosInstance.get(`/veilarbdialog/api/eskaleringsvarsel/gjeldende?fnr=${fnr}`);
}

export function hentEskaleringsvarselHistorikk(fnr: string): AxiosPromise<EskaleringsvarselHistorikkInnslag[]> {
    return axiosInstance.get(`/veilarbdialog/api/eskaleringsvarsel/historikk?fnr=${fnr}`);
}

export function startEskalering(startEskaleringRequest: StartEskaleringRequest): AxiosPromise {
    return axiosInstance.post('/veilarbdialog/api/eskaleringsvarsel/start', startEskaleringRequest);
}

export function stopEskalering(stopEskaleringRequest: StopEskaleringRequest): AxiosPromise {
    return axiosInstance.patch('/veilarbdialog/api/eskaleringsvarsel/stop', stopEskaleringRequest);
}
