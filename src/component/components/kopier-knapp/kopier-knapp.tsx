import React from 'react';

import { CopyButton } from '@navikt/ds-react';

export function KopierKnappTekst(props: { kopierTekst: string; viseTekst: string }) {
    return (
        <div>
            {props.kopierTekst && (
                <CopyButton
                    copyText={props.kopierTekst}
                    text={props.viseTekst}
                    activeText="kopiert"
                    size="medium"
                    iconPosition="right"
                />
            )}
        </div>
    );
}
