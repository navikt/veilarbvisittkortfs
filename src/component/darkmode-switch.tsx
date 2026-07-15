import { Switch } from '@navikt/ds-react';
import { DARKMODE_VISITTKORT_TOGGLE, useFeaturesFromOboUnleash } from '../api/veilarbpersonflatefs';

interface Props {
    checked: boolean;
    onChange: () => void;
}

export function DarkModeSwitch({ checked, onChange }: Props) {
    const { features } = useFeaturesFromOboUnleash();
    const visDarkModeToggle = features?.[DARKMODE_VISITTKORT_TOGGLE] ?? false;

    if (!visDarkModeToggle) {
        return null;
    }

    return (
        <Switch className="visittkortfs__switch" checked={checked} onChange={onChange} size="small">
            Mørk modus
        </Switch>
    );
}
