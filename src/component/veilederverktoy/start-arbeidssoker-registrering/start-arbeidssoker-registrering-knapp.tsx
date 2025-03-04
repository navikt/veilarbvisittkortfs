import { useAppStore } from '../../../store/app-store';
import { erITestMiljo } from '../../../util/utils';
import { logMetrikk } from '../../../util/logger';
import { useDataStore } from '../../../store/data-store';
import { Dropdown } from '@navikt/ds-react';
import { useOpplysningerOmArbeidssokerMedProfilering } from '../../../api/veilarbperson';

//@todo: check with arbeidssokerregistrering if they can fetch fnr from modiacontext holder
function byggRegistreringUrl() {
    return erITestMiljo()
        ? `https://arbeidssokerregistrering-for-veileder.intern.ansatt.nav.no`
        : `https://arbeidssokerregistrering-for-veileder.intern.nav.no/`;
}

export const StartArbeidssokerRegistreringKnapp = () => {
    const { brukerFnr } = useAppStore();
    const { oppfolging } = useDataStore();
    const { data: opplysningerOmArbeidssoker } = useOpplysningerOmArbeidssokerMedProfilering(brukerFnr);

    const registreringUrl = byggRegistreringUrl();

    const brukerType =
        oppfolging?.kanReaktiveres && !opplysningerOmArbeidssoker?.arbeidssoekerperiodeStartet
            ? 'kanReaktiveres'
            : 'kanIkkeReaktiveres';

    const brukerTekst = () => {
        return 'Arbeidssøkerregisteret';
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
