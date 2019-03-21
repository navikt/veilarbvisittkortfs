import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';

interface OwnProps {
    navigerTilStopKvpPeriode: () => void;
}

function StoppKvpPeriodeProsess({navigerTilStopKvpPeriode }: OwnProps) {
    return (
        <StartProsess
            tittelId="innstillinger.prosess.stopp-kvp.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={navigerTilStopKvpPeriode}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.stopp-kvp.tekst" />
                </Normaltekst>
            </div>
        </StartProsess>
    );
}

export default visibleIf(StoppKvpPeriodeProsess);