import { erITestMiljo } from '../../../util/utils';
import { logMetrikk } from '../../../util/logger';
import { useDataStore } from '../../../store/data-store';
import { kanRegistreresEllerReaktiveres } from '../../../util/selectors';
import { Dropdown } from '@navikt/ds-react';

//@todo: check with arbeidssokerregistrering if they can fetch fnr from modiacontext holder
function byggRegistreringUrl() {
    return erITestMiljo()
        ? `https://arbeidssokerregistrering-for-veileder.intern.dev.nav.no`
        : `https://arbeidssokerregistrering-for-veileder.intern.nav.no/`;
}

export const StartArbeidssokerRegistreringKnapp = () => {
    const { oppfolging } = useDataStore();

    const kanRegistreres = kanRegistreresEllerReaktiveres(oppfolging);
    const registreringUrl = byggRegistreringUrl();

    if (!kanRegistreres) {
        return null;
    }
    const brukerType = oppfolging?.kanReaktiveres ? 'kanReaktiveres' : 'kanIkkeReaktiveres';

    const brukerTekst = () => {
        switch (brukerType) {
            case 'kanReaktiveres':
                return 'Reaktiver arbeidssøker';
            case 'kanIkkeReaktiveres':
                return 'Registrer arbeidssøker';
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
