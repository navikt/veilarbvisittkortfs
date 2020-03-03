import React from 'react';
import './veilederverktoy.less';
import Dropdown from '../components/dropdown/dropdown';
import { ReactComponent as TannHjulIkon } from './tannhjul.svg';
import StartRegistreringProsess from './start-registrering/start-registrering-prosess';
import { useDispatch, useSelector } from 'react-redux';
import OppfolgingSelector from '../../store/oppfolging/selector';
import { navigerAction, navigerTilAvsluttOppfolging } from '../../store/navigation/actions';
import { Appstate } from '../../types/appstate';
import ArbeidslisteSelector from '../../store/arbeidsliste/selector';
import TilgangTilKontorSelector from '../../store/tilgang-til-brukerskontor/selector';
import StartProsess from './prosess/start-prosess';

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
                        <span id="veilederverkoy_span">Veilederverktøy</span>
                    </>
                }
                name="tildel veileder"
                btnClassnames="knapp knapp--standard knapp-fss"
                render={lukkDropdown => (
                    <>
                        {kanEndreArbeidsliste && (
                            <li>
                                <StartProsess
                                    knappeTekst="Rediger arbeidsliste"
                                    onClick={() => naviger('vis_arbeidsliste')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste"
                                />
                            </li>
                        )}
                        {kanLagreArbeidsliste && (
                            <li>
                                <StartProsess
                                    knappeTekst="Legg til arbeidsliste"
                                    onClick={() => naviger('vis_arbeidsliste')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste"
                                />
                            </li>
                        )}
                        {kanTildeleVeileder && (
                            <li>
                                <StartProsess
                                    metricName="veilarbvisittkortfs.metrikker.tildel_veileder"
                                    knappeTekst="Tildel veileder"
                                    onClick={() => naviger('tildel_veileder')(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanStarteEskalering && (
                            <li>
                                <StartProsess
                                    knappeTekst="Send varsel"
                                    onClick={() => naviger('start_eskalering')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.send_eskalering"
                                />
                            </li>
                        )}
                        {kanStoppeEskalering && (
                            <li>
                                <StartProsess
                                    knappeTekst="Deaktiver varsel"
                                    onClick={() => naviger('stopp_eskalering')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.deaktiver_esklaring"
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
                                <StartProsess
                                    knappeTekst="Endre til manuell oppfølging"
                                    onClick={() => naviger('manuell_oppfolging')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.manuell"
                                />
                            </li>
                        )}
                        {kanStarteDigitalOppfolging && (
                            <li>
                                <StartProsess
                                    knappeTekst="Endre til digital oppfølging"
                                    onClick={() => naviger('start_digital_oppfolging')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.digital"
                                />
                            </li>
                        )}
                        {kanStarteKVP && (
                            <li>
                                <StartProsess
                                    knappeTekst="Start KVP-periode"
                                    onClick={() => naviger('start_kvp_periode')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.start_kvp"
                                />
                            </li>
                        )}
                        {kanStoppeKVP && (
                            <li>
                                <StartProsess
                                    knappeTekst="Avslutt KVP-periode"
                                    onClick={() => naviger('stopp_kvp_periode')(lukkDropdown)}
                                    metricName="veilarbvisittkortfs.metrikker.stopp_kvp"
                                />
                            </li>
                        )}
                        <li>
                            <StartProsess
                                knappeTekst="Opprett Gosys-oppgave"
                                onClick={() => naviger('opprett_oppgave')(lukkDropdown)}
                                metricName="veilarbvisittkortfs.metrikker.gosys"
                            />
                        </li>
                        {kanAvslutteOppfolging && (
                            <li>
                                <StartProsess
                                    knappeTekst="Avslutt oppfølging"
                                    onClick={() => {
                                        dispatch(navigerTilAvsluttOppfolging());
                                        lukkDropdown();
                                    }}
                                    metricName="veilarbvisittkortfs.metrikker.avslutt_oppfolging"
                                />
                            </li>
                        )}
                        <li>
                            <StartProsess
                                knappeTekst="Vis historikk"
                                onClick={() => naviger('vis_historikk')(lukkDropdown)}
                                metricName="veilarbvisittkortfs.metrikker.historikk"
                            />
                        </li>
                    </>
                )}
            />
        </div>
    );
}

export default Veilederverktoyslinje;
