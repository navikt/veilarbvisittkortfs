import { CopyButton } from '@navikt/ds-react';
import './kopier-knapp.less';

interface Props {
    kopierTekst: string;
    viseTekst: string;
    arialabel: string;
}

export function KopierKnappTekst({ kopierTekst, viseTekst, arialabel }: Props) {
    return (
        <div className="fnr-og-telefon">
            {kopierTekst && (
                <CopyButton
                    aria-label={arialabel}
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
