import React, { useEffect } from 'react';
import Kvittering from '../prosess/kvittering';
import { fetchRegistreringData } from '../../../api/registrering-api';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { logger } from '../../../util/logger';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { useDataStore } from '../../../store-midlertidig/data-store';

export interface StartManuellOppfolgingKvitteringProps {
    begrunnelse: string;
}

function loggMetrikk(fnr: string, erReservertIKRR: boolean) {
    fetchRegistreringData(fnr)
        .then((registreringData) => {
            const erManueltRegistrert = !!registreringData.registrering.manueltRegistrertAv;
            const logFields = {
                brukerType: registreringData.type,
                erKRR: erReservertIKRR,
                erManueltRegistrert,
            };
            logger.event('veilarbvisittkortfs.metrikker.manuell_oppfolging', logFields);
        })
        .catch(); // Squelch errors
}

function StartManuellOppfolgingKvittering(props: StartManuellOppfolgingKvitteringProps) {
    const { brukerFnr } = useAppStore();
    const { oppfolging } = useDataStore();

    useEffect(() => {
        loggMetrikk(brukerFnr, oppfolging.reservasjonKRR);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
