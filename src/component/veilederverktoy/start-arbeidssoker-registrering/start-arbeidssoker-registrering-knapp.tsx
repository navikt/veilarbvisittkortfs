import { erITestMiljo } from '../../../util/utils';
import { logMetrikk } from '../../../util/logger';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { StringOrNothing } from '../../../util/type/utility-types';
import { BRUK_GAMMEL_ARBEIDSREGISTRERING_URL } from '../../../api/veilarbpersonflatefs';
import { Dropdown } from '@navikt/ds-react';

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

export const StartArbeidssokerRegistreringKnapp = () => {
    const { brukerFnr, enhetId } = useAppStore();
    const { oppfolging, features } = useDataStore();
    const registreringUrl = byggRegistreringUrl(brukerFnr, enhetId, features[BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]);
    const brukerType = oppfolging?.kanReaktiveres ? 'kanReaktiveres' : 'kanIkkeReaktiveres';

    const brukerTekst = () => {
        switch (brukerType) {
            case 'kanReaktiveres':
                return 'Reaktiver arbeidssøker';
            case 'kanIkkeReaktiveres':
                return 'Registrer person';
            default:
                return null;
        }
    };

    return (
        <Dropdown.Menu.List.Item
            as="a"
            href={registreringUrl}
            onClick={() => logMetrikk('veilarbvisittkortfs.metrikker.registrering', {}, { brukerType: brukerType })}
        >
            {brukerTekst()}
        </Dropdown.Menu.List.Item>
    );
};
