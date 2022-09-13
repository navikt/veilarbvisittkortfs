import React from 'react';
import './kopier-knapp.less';
import { useState } from 'react';
import { useEffect } from 'react';

import { CopyToClipboard } from '@navikt/ds-react-internal';
import { BodyShort } from '@navikt/ds-react';

export function KopierKnappTekst(props: { kopierTekst: string }) {
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        let timeOutId = 0;
        if (copySuccess) {
            timeOutId = window.setTimeout(() => setCopySuccess(false), 1000);
        }
        return () => clearTimeout(timeOutId);
    }, [copySuccess]);

    return (
        <BodyShort as="div" size="small" className="kopier-knapp navds-body-short navds-body-short--small">
            {props.kopierTekst && (
                <CopyToClipboard
                    className="navdsi-copy-to-clipboard navds-button navds-button--tertiary navds-button--xsmall"
                    copyText={props.kopierTekst}
                    popoverText="kopiert"
                    size="xsmall"
                >
                    {props.kopierTekst}
                </CopyToClipboard>
            )}
        </BodyShort>
    );
}
