import React from 'react';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import StartEskaleringProsess from '../start-eskalering/start-eskalering-prosess';
import StarManuellOppfolging from '../start-manuell-oppfolging/start-manuell-oppfolging';
import StartKvpPeriodeProsess from '../start-kvp/start-kvp-prosess';

function Prosesser () {
    return (
        <VeilederVerktoyModal
            ingenTilbakeKnapp={true}
            visConfirmDialog={false}
            touched={false}
        >
            <StartEskaleringProsess/>
            <StarManuellOppfolging/>
            <StartKvpPeriodeProsess/>
        </VeilederVerktoyModal>
    );
}

export default Prosesser;