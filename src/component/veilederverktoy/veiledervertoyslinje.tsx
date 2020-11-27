import React from 'react';
import './veilederverktoy.less';
import Dropdown from '../components/dropdown/dropdown';
import { ReactComponent as TannHjulIkon } from './tannhjul.svg';
import StartRegistreringProsess from './start-registrering/start-registrering-prosess';
import StartProsess from './prosess/start-prosess';
import { useAppStore } from '../../store-midlertidig/app-store';
import { logger } from '../../util/logger';
import { ModalType, useModalStore } from '../../store-midlertidig/modal-store';
import { useDataStore } from '../../store-midlertidig/data-store';
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
    selectKanTildeleVeileder,
} from '../../util/selectors';

function Veilederverktoyslinje() {
    const { visVeilederVerktoy } = useAppStore();
    const { oppfolging, tilgangTilBrukersKontor, innloggetVeileder, arbeidsliste, oppfolgingsstatus } = useDataStore();
    const { showModal } = useModalStore();

    const kanStarteEskalering = selectKanSendeEskaleringsVarsel(oppfolging, tilgangTilBrukersKontor);
    const kanStoppeEskalering = selectKanStoppeEskaleringsVarsel(oppfolging, tilgangTilBrukersKontor);
    const kanAvslutteOppfolging = selectKanAvslutteOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteManuellOppfolging = selectKanStarteManuellOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteDigitalOppfolging = selectKanStarteDigitalOppfolging(oppfolging, tilgangTilBrukersKontor);
    const kanStarteKVP = selectKanStarteKVP(oppfolging, tilgangTilBrukersKontor);
    const kanStoppeKVP = selectKanStoppeKVP(oppfolging, tilgangTilBrukersKontor);
    const kanRegistrere = kanRegistreresEllerReaktiveres(oppfolging);
    const kanLagreArbeidsliste = selectKanLeggeIArbeidsListe(innloggetVeileder, oppfolgingsstatus, arbeidsliste);
    const kanEndreArbeidsliste = selectKanRedigereArbeidsliste(arbeidsliste);
    const kanTildeleVeileder = selectKanTildeleVeileder(oppfolging, tilgangTilBrukersKontor);

    const visModal = (type: ModalType) => {
        showModal(type);
        return (lukkDroppDown: () => void) => lukkDroppDown();
    };

    if (!visVeilederVerktoy) {
        return null;
    }

    const arbeidslisteKlikk = (lukkDropdown: any) => {
        logger.event('veilarbvisittkortfs.metrikker.veilederverktoy.arbeidsliste', {
            leggtil: !kanEndreArbeidsliste && kanLagreArbeidsliste,
        });
        visModal(ModalType.VIS_ARBEIDSLISTE)(lukkDropdown);
    };

    return (
        <div className="veiledervektoy-dropdown">
            <Dropdown
                metricName="dropdown-trykket"
                ariaLabelledBy="veilederverkoy_span"
                knappeTekst={
                    <>
                        <TannHjulIkon className="knapp-fss__icon" />{' '}
                        <span id="veilederverkoy_span">Veilederverktøy</span>
                    </>
                }
                name="tildel veileder"
                btnClassnames="knapp knapp--standard knapp-fss"
                render={(lukkDropdown) => (
                    <>
                        {kanEndreArbeidsliste && (
                            <li>
                                <StartProsess
                                    knappeTekst="Rediger arbeidsliste"
                                    onClick={() => arbeidslisteKlikk(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanLagreArbeidsliste && (
                            <li>
                                <StartProsess
                                    knappeTekst="Legg i arbeidsliste"
                                    onClick={() => arbeidslisteKlikk(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanTildeleVeileder && (
                            <li>
                                <StartProsess
                                    metricName="tildel_veileder"
                                    knappeTekst="Tildel veileder"
                                    onClick={() => visModal(ModalType.TILDEL_VEILEDER)(lukkDropdown)}
                                />
                            </li>
                        )}
                        {kanStarteEskalering && (
                            <li>
                                <StartProsess
                                    knappeTekst="Send varsel"
                                    onClick={() => visModal(ModalType.START_ESKALERING)(lukkDropdown)}
                                    metricName="send_eskalering"
                                />
                            </li>
                        )}
                        {kanStoppeEskalering && (
                            <li>
                                <StartProsess
                                    knappeTekst="Deaktiver varsel"
                                    onClick={() => visModal(ModalType.STOPP_ESKALERING)(lukkDropdown)}
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
                                    onClick={() => visModal(ModalType.MANUELL_OPPFOLGING)(lukkDropdown)}
                                    metricName="manuell"
                                />
                            </li>
                        )}
                        {kanStarteDigitalOppfolging && (
                            <li>
                                <StartProsess
                                    knappeTekst="Endre til digital oppfølging"
                                    onClick={() => visModal(ModalType.START_DIGITAL_OPPFOLGING)(lukkDropdown)}
                                    metricName="digital"
                                />
                            </li>
                        )}
                        {kanStarteKVP && (
                            <li>
                                <StartProsess
                                    knappeTekst="Start KVP-periode"
                                    onClick={() => visModal(ModalType.START_KVP_PERIODE)(lukkDropdown)}
                                    metricName="start_kvp"
                                />
                            </li>
                        )}
                        {kanStoppeKVP && (
                            <li>
                                <StartProsess
                                    knappeTekst="Avslutt KVP-periode"
                                    onClick={() => visModal(ModalType.STOPP_KVP_PERIODE)(lukkDropdown)}
                                    metricName="stopp_kvp"
                                />
                            </li>
                        )}
                        <li>
                            <StartProsess
                                knappeTekst="Opprett Gosys-oppgave"
                                onClick={() => visModal(ModalType.OPPRETT_OPPGAVE)(lukkDropdown)}
                                metricName="gosys"
                            />
                        </li>
                        {kanAvslutteOppfolging && (
                            <li>
                                <StartProsess
                                    knappeTekst="Avslutt oppfølging"
                                    onClick={() => visModal(ModalType.AVSLUTT_OPPFOLGING)(lukkDropdown)}
                                    metricName="avslutt_oppfolging"
                                />
                            </li>
                        )}
                        <li>
                            <StartProsess
                                knappeTekst="Vis historikk"
                                onClick={() => visModal(ModalType.VIS_HISTORIKK)(lukkDropdown)}
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
