import { axiosInstance, createPOSToptions, ErrorMessage, swrOptions } from './utils';
import { AxiosPromise } from 'axios';
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

export function fetchHarUtkast(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.post<boolean>(`/veilarbvedtaksstotte/api/v2/hent-harUtkast`, { fnr: fnr });
}

export function useGjeldende14aVedtak(fnr: string) {
    const url = '/veilarbvedtaksstotte/api/hent-gjeldende-14a-vedtak';
    const { data, error, isLoading } = useSWR<Oppfolgingsvedtak14a | null, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        async () => {
            const response = await fetch(url, createPOSToptions({ fnr }));

            if (response.status === 200) {
                try {
                    const text = await response.text();
                    return (await JSON.parse(text)) as Oppfolgingsvedtak14a;
                } catch {
                    return null;
                }
            } else {
                return null;
            }
        },
        swrOptions
    );
    return { data, isLoading, error };
}
