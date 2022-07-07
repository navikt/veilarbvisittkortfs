import React from 'react';
import { StringOrNothing } from '../../../util/type/stringornothings';
import { erITestMiljo } from '../../../util/utils';
import { logMetrikk } from '../../../util/logger';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { kanRegistreresEllerReaktiveres } from '../../../util/selectors';

function byggRegistreringUrl(fnr: string, enhet: StringOrNothing) {
    return erITestMiljo()
        ? `https://arbeidssokerregistrering.dev.intern.nav.no?fnr=${fnr}&enhetId=${enhet}`
        : `https://arbeidssokerregistrering.intern.nav.no?fnr=${fnr}&enhetId=${enhet}`;
}

function StartRegistreringProsess() {
    const { brukerFnr, enhetId } = useAppStore();
    const { oppfolging } = useDataStore();

    const kanRegistreres = kanRegistreresEllerReaktiveres(oppfolging);

    if (!kanRegistreres) {
        return null;
    }
    const brukerType = oppfolging?.erSykmeldtMedArbeidsgiver
        ? 'erSykemeldtMedArbeidsgiver'
        : oppfolging?.kanReaktiveres
        ? 'kanReaktiveres'
        : 'kanIkkeReaktiveres';

    const brukerTekst = () => {
        switch (brukerType) {
            case 'erSykemeldtMedArbeidsgiver':
                return 'Start oppfølging';
            case 'kanReaktiveres':
                return 'Reaktiver arbeidssøker';
            case 'kanIkkeReaktiveres':
                return 'Registrer person';
            default:
                return null;
        }
    };

    return (
        <a
            href={byggRegistreringUrl(brukerFnr, enhetId)}
            className="knapp meny-knapp btn--mb1"
            onClick={() => logMetrikk('veilarbvisittkortfs.metrikker.registrering', {}, { brukerType: brukerType })}
        >
            {brukerTekst()}
        </a>
    );
}

export default StartRegistreringProsess;
