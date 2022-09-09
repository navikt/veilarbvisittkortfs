import React from 'react';
import './kopier-knapp.less';
import { useState } from 'react';
import { useEffect } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { CopyToClipboard } from '@navikt/ds-react-internal';

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
            {props.kopierTekst}
            {props.kopierTekst && <CopyToClipboard copyText={props.kopierTekst} popoverText="Kopiert" size="xsmall" />}
        </BodyShort>
    );
}
