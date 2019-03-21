import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';

interface StartEskaleringProsessProps {
    navigerTilStartEsklaring: () => void;
}

function StartEskaleringProsess({navigerTilStartEsklaring }: StartEskaleringProsessProps) {
    return (
        <StartProsess
            tittelId="innstillinger.prosess.start-eskalering.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={navigerTilStartEsklaring}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.start-eskalering.tekst" />
                </Normaltekst>
            </div>
        </StartProsess>
    );
}

export default visibleIf(StartEskaleringProsess);