import React from 'react';
import './kopier-knapp.less';

import { CopyButton } from '@navikt/ds-react';

export function KopierKnappTekst(props: { kopierTekst: string; viseTekst: string }) {
    return (
        <div className="fnr-og-telefon">
            {props.kopierTekst && (
                <CopyButton
                    copyText={props.kopierTekst}
                    text={props.viseTekst}
                    activeText="Kopiert!"
                    size="medium"
                    iconPosition="right"
                    className="copybutton"
                />
            )}
        </div>
    );
}
