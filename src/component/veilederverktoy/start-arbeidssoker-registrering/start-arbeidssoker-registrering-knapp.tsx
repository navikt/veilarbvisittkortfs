import { useAppStore } from '../../../store/app-store';
import { erITestMiljo } from '../../../util/utils';
import { logMetrikk } from '../../../util/logger';
import { useDataStore } from '../../../store/data-store';
import { kanRegistreresEllerReaktiveres } from '../../../util/selectors';
import { Dropdown } from '@navikt/ds-react';
import { useOpplysningerOmArbeidssokerMedProfilering } from '../../../api/veilarbperson';

//@todo: check with arbeidssokerregistrering if they can fetch fnr from modiacontext holder
function byggRegistreringUrl() {
    return erITestMiljo()
        ? `https://arbeidssokerregistrering-for-veileder.intern.dev.nav.no`
        : `https://arbeidssokerregistrering-for-veileder.intern.nav.no/`;
}

export const StartArbeidssokerRegistreringKnapp = () => {
    const { brukerFnr } = useAppStore();
    const { oppfolging } = useDataStore();
    const { data: opplysningerOmArbeidssoker } = useOpplysningerOmArbeidssokerMedProfilering(brukerFnr);

    const kanRegistreres = kanRegistreresEllerReaktiveres(oppfolging);
    const registreringUrl = byggRegistreringUrl();

    if (!kanRegistreres && !!opplysningerOmArbeidssoker?.arbeidssoekerperiodeStartet) {
        return null;
    }
    const brukerType =
        oppfolging?.kanReaktiveres && !opplysningerOmArbeidssoker?.arbeidssoekerperiodeStartet
            ? 'kanReaktiveres'
            : 'kanIkkeReaktiveres';

    const brukerTekst = () => {
        if (brukerType === 'kanReaktiveres') {
            return 'Reaktiver arbeidssøker';
        }
        return 'Registrer arbeidssøker';
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
