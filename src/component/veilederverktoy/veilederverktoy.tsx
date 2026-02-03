import { Button, Dropdown } from '@navikt/ds-react';
import { CogIcon } from '@navikt/aksel-icons';
import { StartProsessKnapp } from './prosess/start-prosess-knapp';
import { useBrukerFnr } from '../../store/app-store';
import { useModalStore } from '../../store/modal-store';
import {
    selectKanAvslutteOppfolging,
    selectKanSendeEskaleringsVarsel,
    selectKanStarteDigitalOppfolging,
    selectKanStarteKVP,
    selectKanStarteManuellOppfolging,
    selectKanStoppeEskaleringsVarsel,
    selectKanStoppeKVP,
    selectKanTildeleVeileder
} from '../../util/selectors';
import { harTilgangTilHuskelappEllerFargekategori } from '../huskelapp/harTilgangTilHuskelapp';
import { useErUfordeltBruker, useHuskelapp } from '../../api/veilarbportefolje';
import { useOppfolging, useOppfolgingsstatus, useTilgangTilBrukersKontor } from '../../api/veilarboppfolging';
import withClickMetric from '../components/click-metric/click-metric';
import './veilederverktoy.less';
import { StartArbeidsoppfolgingKnapp } from './start-arbeidsoppfolging/start-arbeidsoppfolging-knapp';
import { StartArbeidssokerRegistreringKnapp } from './start-arbeidssoker-registrering/start-arbeidssoker-registrering-knapp';
import { erProd, isLocalDevelopment } from '../../util/utils';
import { useVisVeilederVerktøy } from '../../store/visittkort-config';
import { useGjeldendeEskaleringsvarsel } from '../../api/veilarbdialog';

const ButtonWithClickMetric = withClickMetric(Button);

export const Veilederverktoy = () => {
    const brukerFnr = useBrukerFnr();
    const visVeilederVerktoy = useVisVeilederVerktøy();
    const { oppfolging } = useOppfolging(brukerFnr);
    const { gjeldendeEskaleringsvarsel } = useGjeldendeEskaleringsvarsel(brukerFnr);
    const { data: oppfolgingsstatus } = useOppfolgingsstatus(brukerFnr);
    const { data: erUfordeltBruker } = useErUfordeltBruker(
        brukerFnr,
        visVeilederVerktoy && oppfolging?.underOppfolging
    );
    const { data: tilgangTilBrukersKontor } = useTilgangTilBrukersKontor(brukerFnr);

    const {
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
        showByttOppfolgingKontorModal
    } = useModalStore();

    const sjekkHarTilgangTilHuskelappEllerFargekategori = harTilgangTilHuskelappEllerFargekategori(
        erUfordeltBruker === undefined ? true : erUfordeltBruker,
        !!oppfolgingsstatus?.veilederId,
        !!tilgangTilBrukersKontor?.tilgangTilBrukersKontor
    );

    const { data: huskelapp } = useHuskelapp(
        brukerFnr,
        visVeilederVerktoy && sjekkHarTilgangTilHuskelappEllerFargekategori
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
    const underOppfolging = oppfolging?.underOppfolging || false;
    const erIservIArena = oppfolgingsstatus?.formidlingsgruppe == 'ISERV' || false;
    const kanAvslutteOppfolging = selectKanAvslutteOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteManuellOppfolging = selectKanStarteManuellOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteDigitalOppfolging = selectKanStarteDigitalOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteKVP = selectKanStarteKVP(oppfolging, tilgangTilBrukersKontor);
    const kanStoppeKVP = selectKanStoppeKVP(oppfolging, tilgangTilBrukersKontor);
    const kanTildeleVeileder = selectKanTildeleVeileder(oppfolging, tilgangTilBrukersKontor);
    const harLansertArbeidsoppfolgingskontor = !erProd() || isLocalDevelopment();

    const huskelappKlikk = () => {
        showHuskelappRedigereModal();
    };

    if (!visVeilederVerktoy) {
        return null;
    }

    return (
        <Dropdown>
            <ButtonWithClickMetric
                as={Dropdown.Toggle}
                icon={<CogIcon title="a11y-title" fontSize="1.5rem" aria-hidden={true} />}
                metricName="dropdown-trykket"
                variant="secondary-neutral"
                className="veilederverktoy-dropdown-button"
            >
                Veilederverktøy
            </ButtonWithClickMetric>
            <Dropdown.Menu placement="bottom-end">
                <Dropdown.Menu.List className="veilederverktoy-dropdown-menyliste">
                    <StartArbeidsoppfolgingKnapp underOppfolging={underOppfolging} erIservIArena={erIservIArena} />
                    <StartArbeidssokerRegistreringKnapp />
                    {sjekkHarTilgangTilHuskelappEllerFargekategori && (
                        <>
                            {huskelapp?.huskelappId && (
                                <StartProsessKnapp knappeTekst="Rediger huskelapp" onClick={huskelappKlikk} />
                            )}
                            {huskelapp === null && (
                                <StartProsessKnapp knappeTekst="Lag huskelapp" onClick={huskelappKlikk} />
                            )}
                        </>
                    )}
                    {kanTildeleVeileder && (
                        <StartProsessKnapp
                            metricName="tildel_veileder"
                            knappeTekst="Tildel veileder"
                            onClick={showTildelVeilederModal}
                        />
                    )}
                    {kanStarteEskalering && (
                        <StartProsessKnapp
                            knappeTekst="Send varsel"
                            onClick={showStartEskaleringModal}
                            metricName="send_eskalering"
                        />
                    )}
                    {kanStoppeEskalering && (
                        <StartProsessKnapp
                            knappeTekst="Deaktiver varsel"
                            onClick={showStoppEskaleringModal}
                            metricName="deaktiver_esklaring"
                        />
                    )}
                    {kanStarteManuellOppfolging && (
                        <StartProsessKnapp
                            knappeTekst="Endre til manuell oppfølging"
                            onClick={showStartManuellOppfolgingModal}
                            metricName="manuell"
                        />
                    )}
                    {kanStarteDigitalOppfolging && (
                        <StartProsessKnapp
                            knappeTekst="Endre til digital oppfølging"
                            onClick={showStartDigitalOppfolgingModal}
                            metricName="digital"
                        />
                    )}
                    {kanStarteKVP && (
                        <StartProsessKnapp
                            knappeTekst="Start KVP-periode"
                            onClick={showStartKvpPeriodeModal}
                            metricName="start_kvp"
                        />
                    )}
                    {kanStoppeKVP && (
                        <StartProsessKnapp
                            knappeTekst="Avslutt KVP-periode"
                            onClick={showStoppKvpPeriodeModal}
                            metricName="stopp_kvp"
                        />
                    )}
                    <StartProsessKnapp
                        knappeTekst="Opprett Gosys-oppgave"
                        onClick={showOpprettOppgaveModal}
                        metricName="gosys"
                    />
                    {kanAvslutteOppfolging && (
                        <StartProsessKnapp
                            knappeTekst="Avslutt oppfølging"
                            onClick={showAvsluttOppfolgingModal}
                            metricName="avslutt_oppfolging"
                        />
                    )}
                    {harLansertArbeidsoppfolgingskontor && underOppfolging ? (
                        <StartProsessKnapp
                            knappeTekst={'Bytt oppfølgingskontor'}
                            onClick={showByttOppfolgingKontorModal}
                            metricName="bytt_oppfolgingskontor"
                        />
                    ) : null}
                    <StartProsessKnapp
                        knappeTekst="Vis historikk"
                        onClick={showHistorikkModal}
                        metricName="historikk"
                    />
                </Dropdown.Menu.List>
            </Dropdown.Menu>
        </Dropdown>
    );
};
