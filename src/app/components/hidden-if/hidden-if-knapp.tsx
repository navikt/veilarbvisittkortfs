import hiddenIf from './hidden-if';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import KnappFss from '../knapp-fss/knapp-fss';

export const HiddenIfHovedKnapp = hiddenIf(Hovedknapp);
export const HiddenIfKnapp = hiddenIf(Knapp);
export const HiddenIfKnappFss = hiddenIf(KnappFss);
