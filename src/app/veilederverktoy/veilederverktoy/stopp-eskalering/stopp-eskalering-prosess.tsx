import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';

interface StoppEskaleringsProsessProps {
    navigerTilStoppEskalering: () => void;
}

function StoppEskaleringsProsess({ navigerTilStoppEskalering }: StoppEskaleringsProsessProps) {
    return (
        <StartProsess
            tittelId="innstillinger.prosess.stopp-eskalering.tittel"
            knappetekstId="innstillinger.prosess.stopp-eskalering.knapp-tekst"
            onClick={navigerTilStoppEskalering}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.stopp-eskalering.tekst" />
                </Normaltekst>
            </div>
        </StartProsess>
    );
}
export default visibleIf(StoppEskaleringsProsess);
