import './veilederverktoy.less';
import '../components/knapp-fss/knapp-fss.less';
import Dropdown from '../components/dropdown/dropdown';
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
    selectKanRedigereArbeidsliste,
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
import {
    harTilgangTilHuskelappEllerFargekategori,
    feilErIkke403,
    feilErIkke404,
    feilErIkke400
} from '../huskelapp/harTilgangTilHuskelapp';
import { useArbeidsliste, useErUfordeltBruker, useHuskelapp } from '../../api/veilarbportefolje';
import { useOppfolgingsstatus, useTilgangTilBrukersKontor } from '../../api/veilarboppfolging';

function Veilederverktoylinje() {
    const { visVeilederVerktoy, brukerFnr } = useAppStore();
    const { data: oppfolgingsstatus, error: oppfolgingsstatusError } = useOppfolgingsstatus(brukerFnr);
    const { data: arbeidsliste, error: arbeidslisteError } = useArbeidsliste(brukerFnr);
    const { data: huskelapp, error: huskelappError } = useHuskelapp(brukerFnr);
    const { data: erUfordeltBruker, error: erUfordeltBrukerError } = useErUfordeltBruker(brukerFnr);
    const { data: tilgangTilBrukersKontor, error: tilgangTilBrukersKontorError } =
        useTilgangTilBrukersKontor(brukerFnr);
    const { oppfolging, innloggetVeileder, gjeldendeEskaleringsvarsel, features } = useDataStore();
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
        showHuskelappRedigereModal
    } = useModalStore();

    const dataForHuskelappOgFargekategoriHasErrors =
        feilErIkke403(arbeidslisteError) ||
        (feilErIkke403(huskelappError) && feilErIkke400(huskelappError)) ||
        feilErIkke400(erUfordeltBrukerError) ||
        tilgangTilBrukersKontorError ||
        feilErIkke404(oppfolgingsstatusError);

    const sjekkHarTilgangTilHuskelappEllerFargekategori =
        !dataForHuskelappOgFargekategoriHasErrors &&
        harTilgangTilHuskelappEllerFargekategori(
            erUfordeltBruker === undefined ? true : erUfordeltBruker,
            !!oppfolgingsstatus?.veilederId,
            !!tilgangTilBrukersKontor?.tilgangTilBrukersKontor
        );
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
                lenketekst: `veiledervektoy-${huskelapp?.huskelappId ? 'endre-huskelapp' : 'lag-huskelapp'}`,
                destinasjon: 'huskelapp'
            }
        });
        showHuskelappRedigereModal();
    };

    return (
        <div className="veilederverktoy-dropdown">
            <Dropdown
                metricName="dropdown-trykket"
                ariaLabelledBy="veilederverkoy_span"
                knappeTekst="Veilederverktøy"
                name="tildel veileder"
                btnClassnames="knapp knapp--standard knapp-fss"
                render={lukkDropdown => (
                    <>
                        {sjekkHarTilgangTilHuskelappEllerFargekategori && (
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
                                {huskelapp?.huskelappId && features[HUSKELAPP] && (
                                    <li>
                                        <StartProsess
                                            knappeTekst="Rediger huskelapp"
                                            onClick={() => doAll(huskelappKlikk, lukkDropdown)}
                                        />
                                    </li>
                                )}
                                {huskelapp === null && features[HUSKELAPP] && (
                                    <li>
                                        <StartProsess
                                            knappeTekst="Lag huskelapp"
                                            onClick={() => doAll(huskelappKlikk, lukkDropdown)}
                                        />
                                    </li>
                                )}
                            </>
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

export default Veilederverktoylinje;
