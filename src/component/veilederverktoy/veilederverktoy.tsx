import { Button, Dropdown } from '@navikt/ds-react';
import { CogIcon } from '@navikt/aksel-icons';
import { StartRegistreringProsess } from './start-registrering/start-registrering-prosess';
import { StartProsess } from './prosess/start-prosess';
import { useAppStore } from '../../store/app-store';
import { useModalStore } from '../../store/modal-store';
import { useDataStore } from '../../store/data-store';
import {
    kanRegistreresEllerReaktiveres,
    selectKanAvslutteOppfolging,
    selectKanSendeEskaleringsVarsel,
    selectKanStarteDigitalOppfolging,
    selectKanStarteKVP,
    selectKanStarteManuellOppfolging,
    selectKanStoppeEskaleringsVarsel,
    selectKanStoppeKVP,
    selectKanTildeleVeileder
} from '../../util/selectors';
import { trackAmplitude } from '../../amplitude/amplitude';
import { harTilgangTilHuskelappEllerFargekategori } from '../huskelapp/harTilgangTilHuskelapp';
import { useErUfordeltBruker, useHuskelapp } from '../../api/veilarbportefolje';
import { useOppfolgingsstatus, useTilgangTilBrukersKontor } from '../../api/veilarboppfolging';
import withClickMetric from '../components/click-metric/click-metric';
import './veilederverktoy.less';

const ButtonWithClickMetric = withClickMetric(Button);

export const Veilederverktoy = () => {
    const { visVeilederVerktoy, brukerFnr } = useAppStore();
    const { oppfolging, gjeldendeEskaleringsvarsel } = useDataStore();
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
        showHuskelappRedigereModal
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
    const kanAvslutteOppfolging = selectKanAvslutteOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteManuellOppfolging = selectKanStarteManuellOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteDigitalOppfolging = selectKanStarteDigitalOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteKVP = selectKanStarteKVP(oppfolging, tilgangTilBrukersKontor);
    const kanStoppeKVP = selectKanStoppeKVP(oppfolging, tilgangTilBrukersKontor);
    const kanRegistrere = kanRegistreresEllerReaktiveres(oppfolging);
    const kanTildeleVeileder = selectKanTildeleVeileder(oppfolging, tilgangTilBrukersKontor);

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
                    {sjekkHarTilgangTilHuskelappEllerFargekategori && (
                        <>
                            {huskelapp?.huskelappId && (
                                <StartProsess knappeTekst="Rediger huskelapp" onClick={huskelappKlikk} />
                            )}
                            {huskelapp === null && (
                                <StartProsess knappeTekst="Lag huskelapp" onClick={huskelappKlikk} />
                            )}
                        </>
                    )}
                    {kanTildeleVeileder && (
                        <StartProsess
                            metricName="tildel_veileder"
                            knappeTekst="Tildel veileder"
                            onClick={showTildelVeilederModal}
                        />
                    )}
                    {kanStarteEskalering && (
                        <StartProsess
                            knappeTekst="Send varsel"
                            onClick={showStartEskaleringModal}
                            metricName="send_eskalering"
                        />
                    )}
                    {kanStoppeEskalering && (
                        <StartProsess
                            knappeTekst="Deaktiver varsel"
                            onClick={showStoppEskaleringModal}
                            metricName="deaktiver_esklaring"
                        />
                    )}
                    {kanRegistrere && <StartRegistreringProsess />}
                    {kanStarteManuellOppfolging && (
                        <StartProsess
                            knappeTekst="Endre til manuell oppfølging"
                            onClick={showStartManuellOppfolgingModal}
                            metricName="manuell"
                        />
                    )}
                    {kanStarteDigitalOppfolging && (
                        <StartProsess
                            knappeTekst="Endre til digital oppfølging"
                            onClick={showStartDigitalOppfolgingModal}
                            metricName="digital"
                        />
                    )}
                    {kanStarteKVP && (
                        <StartProsess
                            knappeTekst="Start KVP-periode"
                            onClick={showStartKvpPeriodeModal}
                            metricName="start_kvp"
                        />
                    )}
                    {kanStoppeKVP && (
                        <StartProsess
                            knappeTekst="Avslutt KVP-periode"
                            onClick={showStoppKvpPeriodeModal}
                            metricName="stopp_kvp"
                        />
                    )}
                    <StartProsess
                        knappeTekst="Opprett Gosys-oppgave"
                        onClick={showOpprettOppgaveModal}
                        metricName="gosys"
                    />
                    {kanAvslutteOppfolging && (
                        <StartProsess
                            knappeTekst="Avslutt oppfølging"
                            onClick={showAvsluttOppfolgingModal}
                            metricName="avslutt_oppfolging"
                        />
                    )}
                    <StartProsess knappeTekst="Vis historikk" onClick={showHistorikkModal} metricName="historikk" />
                </Dropdown.Menu.List>
            </Dropdown.Menu>
        </Dropdown>
    );
};
