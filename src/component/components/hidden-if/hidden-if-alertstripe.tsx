import { Alert, AlertProps } from '@navikt/ds-react';
import hiddenIf from './hidden-if';

export const HiddenIfAlertStripeAdvarselSolid = hiddenIf(({ children, ...otherProps }: Omit<AlertProps, 'variant'>) => (
    <Alert variant="warning" {...otherProps}>
        {children}
    </Alert>
));
