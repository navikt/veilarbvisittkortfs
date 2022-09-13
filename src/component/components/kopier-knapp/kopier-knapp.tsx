import React from 'react';
import './kopier-knapp.less';
import { useState } from 'react';
import { useEffect } from 'react';

// @ts-ignore
import { CopyToClipboard } from '@navikt/ds-react-internal';
// @ts-ignore
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
        <BodyShort as="div" size="small" className="kopier-knapp">
            {props.kopierTekst && (
                <CopyToClipboard copyText={props.kopierTekst} popoverText="kopiert" size="xsmall">
                    {props.kopierTekst}
                </CopyToClipboard>
            )}
        </BodyShort>
    );
}
