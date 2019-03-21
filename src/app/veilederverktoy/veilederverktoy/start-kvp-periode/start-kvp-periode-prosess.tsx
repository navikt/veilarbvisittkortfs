import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';

interface OwnProps {
    navigerTilStartKvpPeriode: () => void;
}

function StartKvpPeriodeProsess({navigerTilStartKvpPeriode }: OwnProps) {
    return (
            <StartProsess
                tittelId="innstillinger.prosess.start-kvp.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={navigerTilStartKvpPeriode}
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.start-kvp.tekst" />
                    </Normaltekst>
                </div>
            </StartProsess>
    );
}

export default visibleIf(StartKvpPeriodeProsess);