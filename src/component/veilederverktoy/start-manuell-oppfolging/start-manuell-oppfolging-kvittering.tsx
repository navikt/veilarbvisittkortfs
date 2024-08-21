import { useEffect, useState } from 'react';
import { Alert } from '@navikt/ds-react';
import Kvittering from '../prosess/kvittering';
import { logMetrikk } from '../../../util/logger';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchRegistrering } from '../../../api/veilarbperson';

export interface StartManuellOppfolgingKvitteringProps {
    begrunnelse: string;
}

function StartManuellOppfolgingKvittering({ begrunnelse }: StartManuellOppfolgingKvitteringProps) {
    const { brukerFnr } = useAppStore();
    const { oppfolging } = useDataStore();

    const registreringFetcher = useAxiosFetcher(fetchRegistrering);
    const [harLoggetMetrikk, setHarLoggetMetrikk] = useState(false);

    useEffect(() => {
        registreringFetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    useEffect(() => {
        if (registreringFetcher.data && !harLoggetMetrikk) {
            const registreringData = registreringFetcher.data;
            const erManueltRegistrert = !!registreringData.registrering.manueltRegistrertAv;
            const logFields = {
                brukerType: registreringData.type,
                erKRR: !!oppfolging?.reservasjonKRR,
                erManueltRegistrert
            };

            logMetrikk('veilarbvisittkortfs.metrikker.manuell_oppfolging', logFields);
            setHarLoggetMetrikk(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registreringFetcher]);

    return (
        <Kvittering
            tittel="Endre til manuell oppfølging"
            alertStripeTekst={`Endring til manuell oppfølging er gjennomført. Begrunnelse: ${begrunnelse}`}
            footer={
                <Alert variant="warning" size="small">
                    Brukere som ikke kan legge inn CV og jobbprofil selv skal få hjelp til dette.
                </Alert>
            }
        />
    );
}

export default StartManuellOppfolgingKvittering;
