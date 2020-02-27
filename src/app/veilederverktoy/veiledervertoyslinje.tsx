import React from 'react';
import './veilederverktoy.less';
import Dropdown from '../components/dropdown/dropdown';
import { ReactComponent as TannHjulIkon } from './tannhjul.svg';
import StartRegistreringProsess from './start-registrering/start-registrering-prosess';
import StartManuellOppfolging from './start-manuell-oppfolging/start-manuell-oppfolging-prosess';
import StartKvpPeriodeProsess from './start-kvp-periode/start-kvp-periode-prosess';
import StoppKvpPeriodeProsess from './stopp-kvp-periode/stopp-kvp-periode-prosess';
import StartDigitalOppfolgingProsess from './start-digital-oppfolging/start-digital-oppfolging-prosess';
import OpprettOppgaveProsess from './opprett-oppgave/opprett-oppgave-prosess';
import StartEskaleringProsess from './start-eskalering/start-eskalering-prosess';
import StoppEskaleringsProsess from './stopp-eskalering/stopp-eskalering-prosess';
import { HistorikKnapp } from './historikk/vis-historik-knapp';
import { useDispatch, useSelector } from 'react-redux';
import OppfolgingSelector from '../../store/oppfolging/selector';
import AvsluttOppfolgingProsess from './avsluttoppfolging/avslutt-oppfolging-prosess';
import { navigerAction, navigerTilAvsluttOppfolging } from '../../store/navigation/actions';
import { Appstate } from '../../types/appstate';
import ArbeidslisteSelector from '../../store/arbeidsliste/selector';
import TilgangTilKontorSelector from '../../store/tilgang-til-brukerskontor/selector';
import StartProcess from './prosess/start-prosess';

interface VeilederverktoyslinjeProps {
    visVeilederVerktoy?: boolean;
}

function Veilederverktoyslinje({ visVeilederVerktoy }: VeilederverktoyslinjeProps) {
    const kanStarteEskalering = useSelector(OppfolgingSelector.selectKanSendeEskaleringsVarsel);
    const kanStoppeEskalering = useSelector(OppfolgingSelector.selectKanStoppeEskaleringsVarsel);
    const kanAvslutteOppfolging = useSelector(OppfolgingSelector.selectKanAvslutteOppfolging);
    const kanStarteManuellOppfolging = useSelector(OppfolgingSelector.selectKanStarteManuellOppfolging);
    const kanStarteDigitalOppfolging = useSelector(OppfolgingSelector.selectKanStarteDigitalOppfolging);
    const kanStarteKVP = useSelector(OppfolgingSelector.selectKanStarteKVP);
    const kanStoppeKVP = useSelector(OppfolgingSelector.selectKanStoppeKVP);
    const kanRegistrere = useSelector(OppfolgingSelector.kanRegistreresEllerReaktiveres);
    const kanLagreArbeidsliste = useSelector(
        (state: Appstate) =>
            state.tildelVeileder.status !== 'LOADING' && ArbeidslisteSelector.selectKanLeggeIArbeidsListe(state)
    );
    const kanEndreArbeidsliste = useSelector(ArbeidslisteSelector.selectKanRedigereArbeidsliste);
    const kanTildeleVeileder = useSelector(
        (state: Appstate) =>
            OppfolgingSelector.selectErUnderOppfolging(state) &&
            TilgangTilKontorSelector.selectHarTilgangTilKontoret(state)
    );
    const dispatch = useDispatch();

    const naviger = (til: string) => {
        dispatch(navigerAction(til));
        return (lukkDroppDown: () => void) => lukkDroppDown();
    };

    if (!visVeilederVerktoy) {
        return null;
    }

    return (
        <div className="veiledervektoy-dropdown">
            <Dropdown
                metricName="tildel-veileder-trykket"
                knappeTekst={
                    <>
                        <TannHjulIkon className="knapp-fss__icon" />{' '}
                        <span id="veilederverkoy_span">Veilederverktoy</span>
                    </>
                }
                name="tildel veileder"
                btnClassnames="knapp knapp--standard knapp-fss"
                render={lukkDropdown => (
                    <>
                        {kanEndreArbeidsliste && (
                            <li>
                                <StartProcess
                                    knappeTekst="Rediger arbeidsliste"
                                    onClick={() => naviger('vis_arbeidsliste')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste"
                                />
                            </li>
                        )}
                        {kanLagreArbeidsliste && (
                            <li>
                                <StartProcess
                                    knappeTekst="Legg til arbeidsliste"
                                    onClick={() => naviger('vis_arbeidsliste')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste"
                                />
                            </li>
                        )}
                        {kanTildeleVeileder && (
                            <li>
                                <StartProcess
                                    metricName="veilarbvisittkortfs.metrikker.tildel_veileder"
                                    knappeTekst="Tildel veileder"
                                    onClick={() => naviger('tildel_veileder')(lukkDropdown)}
                                />{' '}
                            </li>
                        )}
                        {kanStarteEskalering && (
                            <li>
                                <StartEskaleringProsess
                                    navigerTilStartEsklaring={() => naviger('start_eskalering')(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanStoppeEskalering && (
                            <li>
                                <StoppEskaleringsProsess
                                    navigerTilStoppEskalering={() => naviger('stopp_eskalering')(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanRegistrere && (
                            <li>
                                <StartRegistreringProsess />
                            </li>
                        )}
                        {kanStarteManuellOppfolging && (
                            <li>
                                <StartManuellOppfolging
                                    navigerTilStartManuellOppfolging={() => naviger('manuell_oppfolging')(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanStarteDigitalOppfolging && (
                            <li>
                                <StartDigitalOppfolgingProsess
                                    navigerTilStartDigitalOppfolging={() =>
                                        naviger('start_digital_oppfolging')(lukkDropdown)
                                    }
                                />
                            </li>
                        )}
                        {kanStarteKVP && (
                            <li>
                                <StartKvpPeriodeProsess
                                    navigerTilStartKvpPeriode={() => naviger('start_kvp_periode')(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanStoppeKVP && (
                            <li>
                                <StoppKvpPeriodeProsess
                                    navigerTilStopKvpPeriode={() => naviger('stopp_kvp_periode')(lukkDropdown)}
                                />
                            </li>
                        )}
                        <li>
                            <OpprettOppgaveProsess
                                navigerTilOpprettOppgave={() => naviger('opprett_oppgave')(lukkDropdown)}
                            />
                        </li>
                        {kanAvslutteOppfolging && (
                            <li>
                                <AvsluttOppfolgingProsess
                                    navigerTilAvsluttOppfolging={() => {
                                        dispatch(navigerTilAvsluttOppfolging());
                                        lukkDropdown();
                                    }}
                                />
                            </li>
                        )}
                        <li>
                            <HistorikKnapp navigerTilHistorikk={() => naviger('vis_historikk')(lukkDropdown)} />
                        </li>
                    </>
                )}
            />
        </div>
    );
}

export default Veilederverktoyslinje;
