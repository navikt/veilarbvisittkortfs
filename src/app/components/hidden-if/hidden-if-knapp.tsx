import hiddenIf from './hidden-if';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';

export const HiddenIfHovedKnapp = hiddenIf(Hovedknapp);
export const HiddenIfKnapp = hiddenIf(Knapp);
export const HiddenIfFlatKnapp = hiddenIf(Flatknapp);
