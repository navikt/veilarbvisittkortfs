import React from 'react';
import './kopier-knapp.less';

import { CopyButton, BodyShort } from '@navikt/ds-react';

export function KopierKnappTekst(props: { kopierTekst: string }) {
    return (
        <BodyShort as="div" size="small" className="kopier-knapp">
            {props.kopierTekst && (
                <>
                    <span>{props.kopierTekst}</span>
                    <CopyButton copyText={props.kopierTekst} activeText="kopiert" size="xsmall" />
                </>
            )}
        </BodyShort>
    );
}
