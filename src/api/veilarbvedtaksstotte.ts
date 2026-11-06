import { HttpError, httpPost, swrOptions } from './httpUtils';
import useSWR from 'swr';

export interface Oppfolgingsvedtak14a {
    innsatsgruppe: Innsatsgruppe;
    hovedmal?: Hovedmal;
    fattetDato: Date;
}

export enum Innsatsgruppe {
    GODE_MULIGHETER = 'GODE_MULIGHETER',
    TRENGER_VEILEDNING = 'TRENGER_VEILEDNING',
    TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE = 'TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE',
    JOBBE_DELVIS = 'JOBBE_DELVIS',
    LITEN_MULIGHET_TIL_A_JOBBE = 'LITEN_MULIGHET_TIL_A_JOBBE'
}

export enum Hovedmal {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID',
    OKE_DELTAKELSE = 'OKE_DELTAKELSE'
}

export function useHarUtkast(fnr: string | null) {
    return useSWR(
        fnr ? `harUtkast/${fnr}` : null,
        () => httpPost<boolean>(`/veilarbvedtaksstotte/api/v2/utkast/hent-harUtkast`, { fnr: fnr }),
        swrOptions
    );
}

export function useGjeldende14aVedtak(fnr: string | undefined) {
    const url = '/veilarbvedtaksstotte/api/hent-gjeldende-14a-vedtak';
    const { data, error, isLoading } = useSWR<Oppfolgingsvedtak14a | null, HttpError>(
        fnr ? `${url}/${fnr}` : null,
        async () => {
            const response = await httpPost<Oppfolgingsvedtak14a>(url, { fnr: fnr as string });
            return response.data;
        },
        swrOptions
    );
    return { data, isLoading, error };
}
