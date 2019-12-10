import React from 'react';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import StartEskaleringProsess from '../start-eskalering/start-eskalering-prosess';
import StartManuellOppfolging from '../start-manuell-oppfolging/start-manuell-oppfolging-prosess';
import StartKvpPeriodeProsess from '../start-kvp-periode/start-kvp-periode-prosess';
import StoppKvpPeriodeProsess from '../stopp-kvp-periode/stopp-kvp-periode-prosess';
import StartDigitalOppfolgingProsess from '../start-digital-oppfolging/start-digital-oppfolging-prosess';
import OpprettOppgaveProsess from '../opprett-oppgave/opprett-oppgave-prosess';
import Historikk from '../historikk/historikk';
import AvsluttOppfolgingProsess from '../avsluttoppfolging/avslutt-oppfolging-prosess';
import StartRegistreringProsess from '../start-registrering/start-registrering-prosess';
import './prosesser.less';
import StoppEskaleringsProsess from '../stopp-eskalering/stopp-eskalering-prosess';
import { Appstate } from '../../../../types/appstate';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';

interface StateProps {
    kanStarteEskalering: boolean;
    kanStoppeEskalering: boolean;
    kanAvslutteOppfolging: boolean;
    kanStarteManuellOppfolging: boolean;
    kanStarteDigitalOppfolging: boolean;
    kanStarteKVP: boolean;
    kanStoppeKVP: boolean;
    kanRegistrere: boolean;
}

interface DispatchProps {
    navigerTil: (til: string) => void;
}

function Prosesser(props: StateProps & DispatchProps) {
    return (
        <VeilederVerktoyModal visConfirmDialog={false} className="vis-overflow">
            <StartEskaleringProsess
                visible={props.kanStarteEskalering}
                navigerTilStartEsklaring={() => props.navigerTil('start_eskalering')}
            />
            <StoppEskaleringsProsess
                visible={props.kanStoppeEskalering}
                navigerTilStoppEskalering={() => props.navigerTil('stopp_eskalering')}
            />
            <AvsluttOppfolgingProsess
                visible={props.kanAvslutteOppfolging} //ROUTINGEN SKJER I AVSLUTTOPPFOLGINGSAGAN HVIS KAN AVSLUTTE
            />
            <StartRegistreringProsess visible={props.kanRegistrere} />
            <StartManuellOppfolging
                visible={props.kanStarteManuellOppfolging}
                navigerTilStartManuellOppfolging={() => props.navigerTil('manuell_oppfolging')}
            />
            <StartKvpPeriodeProsess
                visible={props.kanStarteKVP}
                navigerTilStartKvpPeriode={() => props.navigerTil('start_kvp_periode')}
            />
            <StoppKvpPeriodeProsess
                visible={props.kanStoppeKVP}
                navigerTilStopKvpPeriode={() => props.navigerTil('stopp_kvp_periode')}
            />
            <StartDigitalOppfolgingProsess
                visible={props.kanStarteDigitalOppfolging}
                navigerTilStartDigitalOppfolging={() => props.navigerTil('start_digital_oppfolging')}
            />
            <OpprettOppgaveProsess navigerTilOpprettOppgave={() => props.navigerTil('opprett_oppgave')} />
            <Historikk />
        </VeilederVerktoyModal>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    kanStarteEskalering: OppfolgingSelector.selectKanSendeEskaleringsVarsel(state),
    kanStoppeEskalering: OppfolgingSelector.selectKanStoppeEskaleringsVarsel(state),
    kanAvslutteOppfolging: OppfolgingSelector.selectKanAvslutteOppfolging(state),
    kanStarteManuellOppfolging: OppfolgingSelector.selectKanStarteManuellOppfolging(state),
    kanStarteDigitalOppfolging: OppfolgingSelector.selectKanStarteDigitalOppfolging(state),
    kanStarteKVP: OppfolgingSelector.selectKanStarteKVP(state),
    kanStoppeKVP: OppfolgingSelector.selectKanStoppeKVP(state),
    kanRegistrere: OppfolgingSelector.kanRegistreresEllerReaktiveres(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTil: (til: string) => dispatch(navigerAction(til))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Prosesser);
