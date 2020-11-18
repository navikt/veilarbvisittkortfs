import React from 'react';
import { StringOrNothing } from '../../../util/type/stringornothings';
import { erITestMiljo, finnMiljoStreng, finnNaisDomene } from '../../../util/utils';
import { logger } from '../../../util/logger';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { useDataStore } from '../../../store-midlertidig/data-store';
import { kanRegistreresEllerReaktiveres } from '../../../util/selectors';

function byggRegistreringUrl(fnr: string, enhet: StringOrNothing) {
    return `https://arbeidssokerregistrering-fss${finnMiljoStreng()}${finnNaisDomene()}?fnr=${fnr}&enhetId=${enhet}`;
}

function byggVeilarbLoginUrl() {
    return (url: string) =>
        `https://veilarblogin${finnMiljoStreng()}${finnNaisDomene()}veilarblogin/api/start?url=${encodeURIComponent(
            url
        )}`;
}

function StartRegistreringProsess() {
    const { brukerFnr, enhetId } = useAppStore();
    const { oppfolging } = useDataStore();

    const kanRegistreres = kanRegistreresEllerReaktiveres(oppfolging);

    if (!kanRegistreres) {
        return null;
    }

    const veilarbLoginUrl = byggVeilarbLoginUrl();
    const registreringUrl = byggRegistreringUrl(brukerFnr, enhetId);
    const brukerType = oppfolging.erSykmeldtMedArbeidsgiver
        ? 'erSykemeldtMedArbeidsgiver'
        : oppfolging.kanReaktiveres
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
            href={erITestMiljo() ? veilarbLoginUrl(registreringUrl) : registreringUrl}
            className="knapp meny-knapp btn--mb1"
            onClick={() => logger.event('veilarbvisittkortfs.metrikker.registrering', {}, { brukerType: brukerType })}
        >
            {brukerTekst()}
        </a>
    );
}

export default StartRegistreringProsess;
