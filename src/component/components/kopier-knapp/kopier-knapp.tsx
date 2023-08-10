import React from 'react';
import { CopyButton } from '@navikt/ds-react';

export function KopierKnappTekst(props: { kopierTekst: string }) {
    return (
        <div>
            {props.kopierTekst && (
                <CopyButton copyText={props.kopierTekst} text={props.kopierTekst} activeText="kopiert" size="medium"/>
            )}
        </div>
    );
}
