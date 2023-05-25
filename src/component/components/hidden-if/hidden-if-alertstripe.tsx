import hiddenIf from './hidden-if';
import {Alert, AlertProps} from "@navikt/ds-react";

export const HiddenIfAlertStripeAdvarselSolid = hiddenIf(({ children, ...otherProps }: Omit<AlertProps, "variant">) => <Alert variant="warning" {...otherProps}>{ children }</Alert>);
