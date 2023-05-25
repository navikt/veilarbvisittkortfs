import hiddenIf from './hidden-if';
import {Button, ButtonProps} from "@navikt/ds-react";

export const HiddenIfHovedKnapp = hiddenIf((props: ButtonProps) => <Button variant="primary" {...props} />);
export const HiddenIfKnapp = hiddenIf((props: ButtonProps) => <Button variant="secondary" {...props} />);
export const HiddenIfFlatKnapp = hiddenIf((props: ButtonProps) => <Button variant="tertiary" {...props} />);
