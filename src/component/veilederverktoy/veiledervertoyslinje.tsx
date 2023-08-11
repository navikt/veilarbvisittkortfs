import React from 'react';
import './veilederverktoy.less';
import Dropdown from '../components/dropdown/dropdown';
import { CogIcon } from '@navikt/aksel-icons';
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

import { Dropdown as AkselDropdown } from '@navikt/ds-react';
import { doAll } from '../../util/utils';

function Veilederverktoyslinje() {
    const { visVeilederVerktoy } = useAppStore();
    const {
        oppfolging,
        tilgangTilBrukersKontor,
        innloggetVeileder,
        arbeidsliste,
        oppfolgingsstatus,
        gjeldendeEskaleringsvarsel
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
        showHistorikkModal
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

    if (!visVeilederVerktoy) {
        return null;
    }

    const arbeidslisteKlikk = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste', {
            leggtil: !kanEndreArbeidsliste && kanLagreArbeidsliste
        });
        showArbeidslisteModal();
    };

    return (
        <div className="veilederverktoy-dropdown">
            <Dropdown
                metricName="dropdown-trykket"
                ariaLabelledBy="veilederverkoy_span"
                knappeTekst={
                    <>
                        <CogIcon title="verktøyikon" className="knapp-fss__icon"/>
                        <span id="veilederverkoy_span">Veilederverktøy</span>
                    </>
                }
                name="tildel veileder"
                btnClassnames="knapp knapp--standard knapp-fss"
                render={lukkDropdown => (
                    <AkselDropdown.Menu.List>
                        {kanEndreArbeidsliste && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Rediger arbeidsliste"
                                    onClick={() => doAll(arbeidslisteKlikk, lukkDropdown)}
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanLagreArbeidsliste && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Legg i arbeidsliste"
                                    onClick={() => doAll(arbeidslisteKlikk, lukkDropdown)}
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanTildeleVeileder && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    metricName="tildel_veileder"
                                    knappeTekst="Tildel veileder"
                                    onClick={() => doAll(showTildelVeilederModal, lukkDropdown)}
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanStarteEskalering && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Send varsel"
                                    onClick={() => doAll(showStartEskaleringModal, lukkDropdown)}
                                    metricName="send_eskalering"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanStoppeEskalering && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Deaktiver varsel"
                                    onClick={() => doAll(showStoppEskaleringModal, lukkDropdown)}
                                    metricName="deaktiver_esklaring"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanRegistrere && (
                            <AkselDropdown.Menu.List.Item>
                                <StartRegistreringProsess />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanStarteManuellOppfolging && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Endre til manuell oppfølging"
                                    onClick={() => doAll(showStartManuellOppfolgingModal, lukkDropdown)}
                                    metricName="manuell"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanStarteDigitalOppfolging && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Endre til digital oppfølging"
                                    onClick={() => doAll(showStartDigitalOppfolgingModal, lukkDropdown)}
                                    metricName="digital"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanStarteKVP && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Start KVP-periode"
                                    onClick={() => doAll(showStartKvpPeriodeModal, lukkDropdown)}
                                    metricName="start_kvp"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        {kanStoppeKVP && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Avslutt KVP-periode"
                                    onClick={() => doAll(showStoppKvpPeriodeModal, lukkDropdown)}
                                    metricName="stopp_kvp"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        <AkselDropdown.Menu.List.Item>
                            <StartProsess
                                knappeTekst="Opprett Gosys-oppgave"
                                onClick={() => doAll(showOpprettOppgaveModal, lukkDropdown)}
                                metricName="gosys"
                            />
                        </AkselDropdown.Menu.List.Item>
                        {kanAvslutteOppfolging && (
                            <AkselDropdown.Menu.List.Item>
                                <StartProsess
                                    knappeTekst="Avslutt oppfølging"
                                    onClick={() => doAll(showAvsluttOppfolgingModal, lukkDropdown)}
                                    metricName="avslutt_oppfolging"
                                />
                            </AkselDropdown.Menu.List.Item>
                        )}
                        <AkselDropdown.Menu.List.Item>
                            <StartProsess
                                knappeTekst="Vis historikk"
                                onClick={() => doAll(showHistorikkModal, lukkDropdown)}
                                metricName="historikk"
                            />
                        </AkselDropdown.Menu.List.Item>
                    </AkselDropdown.Menu.List>
                )}
            />
        </div>
    );
}

export default Veilederverktoyslinje;
