import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';

interface OwnProps {
    navigerTilStartManuellOppfolging: () => void;
}

function StarManuellOppfolging({navigerTilStartManuellOppfolging }: OwnProps) {
    return (
        <StartProsess
            tittelId="innstillinger.prosess.manuell.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={navigerTilStartManuellOppfolging}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.manuell.tekst" />
                </Normaltekst>
            </div>
        </StartProsess>
    );
}

export default visibleIf(StarManuellOppfolging);