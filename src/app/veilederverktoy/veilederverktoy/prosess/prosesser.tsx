import React from 'react';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import StartEskaleringProsess from '../start-eskalering/start-eskalering-prosess';
import StarManuellOppfolging from '../start-manuell-oppfolging/start-manuell-oppfolging-prosess';
import StartKvpPeriodeProsess from '../start-kvp-periode/start-kvp-periode-prosess';
import StoppKvpPeriodeProsess from '../stopp-kvp-periode/stopp-kvp-periode-prosess';
import StartDigitalOppfolgingProsess from '../start-digital-oppfolging/start-digital-oppfolging-prosess';
import OpprettOppgaveProsess from '../opprett-oppgave/opprett-oppgave-prosess';
import Historikk from '../historikk/historikk';
import AvsluttOppfolgingProsess from '../avslutt-oppfolging/avslutt-oppfolging-prosess';
import './prosesser.less';

function Prosesser () {
    return (
        <VeilederVerktoyModal
            visConfirmDialog={false}
            className='vis-overflow'
        >
            <StartEskaleringProsess/>
            <AvsluttOppfolgingProsess/>
            <StarManuellOppfolging/>
            <StartKvpPeriodeProsess/>
            <StoppKvpPeriodeProsess/>
            <StartDigitalOppfolgingProsess/>
            <OpprettOppgaveProsess/>
            <Historikk/>
        </VeilederVerktoyModal>
    );
}

export default Prosesser;