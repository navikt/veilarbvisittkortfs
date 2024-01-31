import './veilederverktoy.less';
import '../components/knapp-fss/knapp-fss.less';
import StartRegistreringProsess from './start-registrering/start-registrering-prosess';
import StartProsess from './prosess/start-prosess';
import { useAppStore } from '../../store/app-store';
import { logMetrikk } from '../../util/logger';
import { useModalStore } from '../../store/modal-store';
import { useDataStore } from '../../store/data-store';
import {
    kanRegistreresEllerReaktiveres,
    selectKanAvslutteOppfolging,
    selectKanLeggeIArbeidsListe,
    selectKanOppretteHuskelapp,
    selectKanRedigereArbeidsliste,
    selectKanRedigereHuskelapp,
    selectKanSendeEskaleringsVarsel,
    selectKanStarteDigitalOppfolging,
    selectKanStarteKVP,
    selectKanStarteManuellOppfolging,
    selectKanStoppeEskaleringsVarsel,
    selectKanStoppeKVP,
    selectKanTildeleVeileder
} from '../../util/selectors';
import { doAll } from '../../util/utils';
import { trackAmplitude } from '../../amplitude/amplitude';
import { HUSKELAPP } from '../../api/veilarbpersonflatefs';
import DropdownMeny from './dropdown-meny/dropdown-meny';

function Veilederverktoyslinje() {
    const { visVeilederVerktoy } = useAppStore();
    const {
        oppfolging,
        tilgangTilBrukersKontor,
        innloggetVeileder,
        arbeidsliste,
        oppfolgingsstatus,
        gjeldendeEskaleringsvarsel,
        huskelapp,
        features
    } = useDataStore();
    const {
        showArbeidslisteModal,
        showTildelVeilederModal,
        showStartEskaleringModal,
        showStoppEskaleringModal,
        showStartManuellOppfolgingModal,
        showStartDigitalOppfolgingModal,
        showStartKvpPeriodeModal,
        showStoppKvpPeriodeModal,
        showOpprettOppgaveModal,
        showAvsluttOppfolgingModal,
        showHistorikkModal,
        showHuskelappRedigereModal,
        showHuskelappModal,
        showHuskelappRedigereMedArbeidslisteModal
    } = useModalStore();

    const kanStarteEskalering = selectKanSendeEskaleringsVarsel(
        oppfolging,
        gjeldendeEskaleringsvarsel,
        tilgangTilBrukersKontor
    );
    const kanStoppeEskalering = selectKanStoppeEskaleringsVarsel(
        oppfolging,
        gjeldendeEskaleringsvarsel,
        tilgangTilBrukersKontor
    );
    const kanAvslutteOppfolging = selectKanAvslutteOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteManuellOppfolging = selectKanStarteManuellOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteDigitalOppfolging = selectKanStarteDigitalOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteKVP = selectKanStarteKVP(oppfolging, tilgangTilBrukersKontor);
    const kanStoppeKVP = selectKanStoppeKVP(oppfolging, tilgangTilBrukersKontor);
    const kanRegistrere = kanRegistreresEllerReaktiveres(oppfolging);
    const kanLagreArbeidsliste = selectKanLeggeIArbeidsListe(innloggetVeileder, oppfolgingsstatus, arbeidsliste);
    const kanEndreArbeidsliste = selectKanRedigereArbeidsliste(arbeidsliste);
    const kanTildeleVeileder = selectKanTildeleVeileder(oppfolging, tilgangTilBrukersKontor);
    const kanOppretteHuskelapp =
        selectKanOppretteHuskelapp(innloggetVeileder, oppfolgingsstatus) && !huskelapp?.huskelappId;
    const kanRedigereHuskelapp =
        selectKanRedigereHuskelapp(innloggetVeileder, oppfolgingsstatus, tilgangTilBrukersKontor) &&
        !!huskelapp?.huskelappId;

    if (!visVeilederVerktoy) {
        return null;
    }

    const arbeidslisteKlikk = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste', {
            leggtil: !kanEndreArbeidsliste && kanLagreArbeidsliste
        });
        trackAmplitude({
            name: 'navigere',
            data: {
                lenketekst: `veiledervektoy-${kanLagreArbeidsliste ? 'opprett-arbeidsliste' : 'rediger-arbeidsliste'}`,
                destinasjon: 'arbeidslista'
            }
        });
        showArbeidslisteModal();
    };

    const huskelappKlikk = () => {
        trackAmplitude({
            name: 'navigere',
            data: {
                lenketekst: `veiledervektoy-${kanOppretteHuskelapp ? 'lag-huskelapp' : 'vis-huskelapp'}`,
                destinasjon: 'huskelapp'
            }
        });

        const harHuskelapp = !!huskelapp?.huskelappId;
        const harArbeidsliste = !!arbeidsliste?.sistEndretAv;
        if (!harArbeidsliste && harHuskelapp) {
            return showHuskelappModal();
        } else if (harArbeidsliste && !harHuskelapp) {
            return showHuskelappRedigereMedArbeidslisteModal();
        }

        return showHuskelappRedigereModal();
    };

    return (
        <div className="veilederverktoy-dropdown">
            <DropdownMeny
                metricName="dropdown-trykket"
                ariaLabelledBy="veilederverkoy_span"
                knappeTekst="Veilederverktøy"
                name="tildel veileder"
                btnClassnames="knapp knapp--standard knapp-fss"
                render={lukkDropdown => (
                    <>
                        {kanEndreArbeidsliste && !features[HUSKELAPP] && (
                            <li>
                                <StartProsess
                                    knappeTekst="Rediger arbeidsliste"
                                    onClick={() => doAll(arbeidslisteKlikk, lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanLagreArbeidsliste && !features[HUSKELAPP] && (
                            <li>
                                <StartProsess
                                    knappeTekst="Legg i arbeidsliste"
                                    onClick={() => doAll(arbeidslisteKlikk, lukkDropdown)}
                                />
                            </li>
                        )}
                        {features[HUSKELAPP] && (kanRedigereHuskelapp || kanEndreArbeidsliste) && (
                            <li>
                                <StartProsess
                                    knappeTekst="Vis huskelapp"
                                    onClick={() => doAll(huskelappKlikk, lukkDropdown)}
                                />
                            </li>
                        )}
                        {features[HUSKELAPP] && kanOppretteHuskelapp && !kanEndreArbeidsliste && (
                            <li>
                                <StartProsess
                                    knappeTekst="Lag huskelapp"
                                    onClick={() => doAll(huskelappKlikk, lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanTildeleVeileder && (
                            <li>
                                <StartProsess
                                    metricName="tildel_veileder"
                                    knappeTekst="Tildel veileder"
                                    onClick={() => doAll(showTildelVeilederModal, lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanStarteEskalering && (
                            <li>
                                <StartProsess
                                    knappeTekst="Send varsel"
                                    onClick={() => doAll(showStartEskaleringModal, lukkDropdown)}
                                    metricName="send_eskalering"
                                />
                            </li>
                        )}
                        {kanStoppeEskalering && (
                            <li>
                                <StartProsess
                                    knappeTekst="Deaktiver varsel"
                                    onClick={() => doAll(showStoppEskaleringModal, lukkDropdown)}
                                    metricName="deaktiver_esklaring"
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
                                    onClick={() => doAll(showStartManuellOppfolgingModal, lukkDropdown)}
                                    metricName="manuell"
                                />
                            </li>
                        )}
                        {kanStarteDigitalOppfolging && (
                            <li>
                                <StartProsess
                                    knappeTekst="Endre til digital oppfølging"
                                    onClick={() => doAll(showStartDigitalOppfolgingModal, lukkDropdown)}
                                    metricName="digital"
                                />
                            </li>
                        )}
                        {kanStarteKVP && (
                            <li>
                                <StartProsess
                                    knappeTekst="Start KVP-periode"
                                    onClick={() => doAll(showStartKvpPeriodeModal, lukkDropdown)}
                                    metricName="start_kvp"
                                />
                            </li>
                        )}
                        {kanStoppeKVP && (
                            <li>
                                <StartProsess
                                    knappeTekst="Avslutt KVP-periode"
                                    onClick={() => doAll(showStoppKvpPeriodeModal, lukkDropdown)}
                                    metricName="stopp_kvp"
                                />
                            </li>
                        )}
                        <li>
                            <StartProsess
                                knappeTekst="Opprett Gosys-oppgave"
                                onClick={() => doAll(showOpprettOppgaveModal, lukkDropdown)}
                                metricName="gosys"
                            />
                        </li>
                        {kanAvslutteOppfolging && (
                            <li>
                                <StartProsess
                                    knappeTekst="Avslutt oppfølging"
                                    onClick={() => doAll(showAvsluttOppfolgingModal, lukkDropdown)}
                                    metricName="avslutt_oppfolging"
                                />
                            </li>
                        )}
                        <li>
                            <StartProsess
                                knappeTekst="Vis historikk"
                                onClick={() => doAll(showHistorikkModal, lukkDropdown)}
                                metricName="historikk"
                            />
                        </li>
                    </>
                )}
            />
        </div>
    );
}

export default Veilederverktoyslinje;
