import hiddenIf from './hidden-if';
import React from 'react';
import { Button, ButtonProps } from '@navikt/ds-react';

export const HiddenIfHovedKnapp = hiddenIf((props: ButtonProps) => (
    <Button variant="primary" size="small" {...props} />
));
export const HiddenIfKnapp = hiddenIf((props: ButtonProps) => <Button variant="secondary" size="small" {...props} />);
export const HiddenIfFlatKnapp = hiddenIf((props: ButtonProps) => (
    <Button variant="tertiary" size="small" {...props} />
));
