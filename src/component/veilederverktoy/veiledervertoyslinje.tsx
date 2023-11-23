import React from 'react';
import './veilederverktoy.less';
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
import { Button, Dropdown } from '@navikt/ds-react';

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

    const startRegistreringsprosess = () => {
        return null;
    };

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

    return (
        <div className="dropdown">
            <Dropdown>
                <Button as={Dropdown.Toggle} variant="primary-neutral">
                    Veilederverktøy
                </Button>
                <Dropdown.Menu>
                    {kanEndreArbeidsliste && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(arbeidslisteKlikk)}>
                            Rediger arbeidsliste
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanLagreArbeidsliste && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(arbeidslisteKlikk)}>
                            Legg i arbeidsliste
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanTildeleVeileder && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showTildelVeilederModal)}>
                            tildel_veileder
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanStarteEskalering && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showStartEskaleringModal)}>
                            Send varsel
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanStoppeEskalering && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showStoppEskaleringModal)}>
                            Deaktiver varsel
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanRegistrere && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(startRegistreringsprosess)}>
                            Start registreringsprosess
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanStarteManuellOppfolging && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showStartManuellOppfolgingModal)}>
                            Endre til manuell oppfølging
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanStarteDigitalOppfolging && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showStartDigitalOppfolgingModal)}>
                            Endre til digital oppfølging
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanStarteKVP && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showStartKvpPeriodeModal)}>
                            Start KVP-periode
                        </Dropdown.Menu.List.Item>
                    )}
                    {kanStoppeKVP && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showStoppKvpPeriodeModal)}>
                            Avslutt KVP-periode
                        </Dropdown.Menu.List.Item>
                    )}
                    <Dropdown.Menu.List.Item onClick={() => doAll(showOpprettOppgaveModal)}>
                        Opprett Gosys-oppgave
                    </Dropdown.Menu.List.Item>
                    {kanAvslutteOppfolging && (
                        <Dropdown.Menu.List.Item onClick={() => doAll(showAvsluttOppfolgingModal)}>
                            Avslutt oppfølging
                        </Dropdown.Menu.List.Item>
                    )}
                    <Dropdown.Menu.List.Item onClick={() => doAll(showHistorikkModal)}>
                        Vis historikk
                    </Dropdown.Menu.List.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Veilederverktoyslinje;
