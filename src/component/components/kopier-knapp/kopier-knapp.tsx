import { CopyButton } from '@navikt/ds-react';
import './kopier-knapp.less';

interface Props {
    kopierTekst: string;
    viseTekst: string;
}

export function KopierKnappTekst({ kopierTekst, viseTekst }: Props) {
    return (
        <div className="fnr-og-telefon">
            {kopierTekst && (
                <CopyButton
                    copyText={kopierTekst}
                    text={viseTekst}
                    activeText="Kopiert!"
                    size="medium"
                    iconPosition="right"
                    className="copybutton"
                />
            )}
        </div>
    );
}
