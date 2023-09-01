import React from 'react';
import './kopier-knapp.less';

import { CopyToClipboard } from '@navikt/ds-react-internal';
import { BodyShort } from '@navikt/ds-react';

export function KopierKnappTekst(props: { kopierTekst: string, visTekst: string }) {
    return (
        <BodyShort as="div" size="small" className="kopier-knapp">
            {props.kopierTekst && (
                <CopyToClipboard copyText={props.kopierTekst} popoverText="kopiert" size="xsmall" iconPosition="right">
                    {props.visTekst}
                </CopyToClipboard>
            )}
        </BodyShort>
    );
}
