import React, { useEffect, useState } from 'react';
import Kvittering from '../prosess/kvittering';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { logger } from '../../../util/logger';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { useDataStore } from '../../../store-midlertidig/data-store';
import { useFetchRegistrering } from '../../../api/api-midlertidig';

export interface StartManuellOppfolgingKvitteringProps {
    begrunnelse: string;
}

function StartManuellOppfolgingKvittering(props: StartManuellOppfolgingKvitteringProps) {
    const { brukerFnr } = useAppStore();
    const { oppfolging } = useDataStore();

    const fetchRegistrering = useFetchRegistrering(brukerFnr);
    const [harLoggetMetrikk, setHarLoggetMetrikk] = useState(false);

    useEffect(() => {
        if (fetchRegistrering.data && !harLoggetMetrikk) {
            const registreringData = fetchRegistrering.data;
            const erManueltRegistrert = !!registreringData.registrering.manueltRegistrertAv;
            const logFields = {
                brukerType: registreringData.type,
                erKRR: oppfolging.reservasjonKRR,
                erManueltRegistrert,
            };

            logger.event('veilarbvisittkortfs.metrikker.manuell_oppfolging', logFields);
            setHarLoggetMetrikk(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchRegistrering]);

    return (
        <Kvittering
            tittel="Endre til manuell oppfølging"
            alertStripeTekst={`Endring til manuell oppfølging er gjennomført. Begrunnelse: ${props.begrunnelse}`}
            footer={
                <AlertStripeAdvarsel>
                    Brukere som ikke kan legge inn CV og jobbprofil selv skal få hjelp til dette.
                </AlertStripeAdvarsel>
            }
        />
    );
}

export default StartManuellOppfolgingKvittering;
