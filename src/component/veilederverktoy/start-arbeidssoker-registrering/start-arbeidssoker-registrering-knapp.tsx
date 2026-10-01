import { erITestMiljo } from '../../../util/utils';
import { Dropdown } from '@navikt/ds-react';

//@todo: check with arbeidssokerregistrering if they can fetch fnr from modiacontext holder
function byggRegistreringUrl() {
    return erITestMiljo()
        ? `https://arbeidssokerregistrering-for-veileder.ansatt.dev.nav.no`
        : `https://arbeidssokerregistrering-for-veileder.intern.nav.no/`;
}

export const StartArbeidssokerRegistreringKnapp = () => {
    const registreringUrl = byggRegistreringUrl();
    return (
        <Dropdown.Menu.List.Item as="a" href={registreringUrl}>
            {'Arbeidssøkerregisteret'}
        </Dropdown.Menu.List.Item>
    );
};
