import React from 'react';
import { erITestMiljo } from '../../../util/utils';
import { logMetrikk } from '../../../util/logger';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { kanRegistreresEllerReaktiveres } from '../../../util/selectors';
import { StringOrNothing } from '../../../util/type/utility-types';
import { BRUK_GAMMEL_ARBEIDSREGISTRERING_URL } from '../../../api/obo-unleash';

//@todo: check with arbeidssokerregistrering if they can fetch fnr from modiacontext holder
function byggRegistreringUrl(fnr: string, enhet: StringOrNothing, bruk_gammel_arbeidsregistrerings_url: boolean) {
    if (bruk_gammel_arbeidsregistrerings_url) {
        return erITestMiljo()
            ? `https://arbeidssokerregistrering-for-veileder.intern.dev.nav.no`
            : `https://arbeidssokerregistrering.intern.nav.no?fnr=${fnr}&enhetId=${enhet}`;
    } else {
        return erITestMiljo()
            ? `https://arbeidssokerregistrering-for-veileder.intern.dev.nav.no`
            : `https://arbeidssokerregistrering-for-veileder.intern.nav.no/`;
    }
}

function StartRegistreringProsess() {
    const { brukerFnr, enhetId } = useAppStore();
    const { oppfolging, features } = useDataStore();

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
            href={byggRegistreringUrl(brukerFnr, enhetId, features[BRUK_GAMMEL_ARBEIDSREGISTRERING_URL])}
            className="knapp meny-knapp btn--mb1"
            onClick={() => logMetrikk('veilarbvisittkortfs.metrikker.registrering', {}, { brukerType: brukerType })}
        >
            {brukerTekst()}
        </a>
    );
}

export default StartRegistreringProsess;
