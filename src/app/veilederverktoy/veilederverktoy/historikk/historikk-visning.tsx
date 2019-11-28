import { InnstillingsHistorikk } from '../../../../types/innstillings-historikk';
import { OppgaveHistorikk } from '../../../../types/oppgave-historikk';
import moment from 'moment';
import OppgaveHistorikkKomponent from './components/oppgavehistorikk';
import InnstillingsHistorikkKomponent from './components/instillingshistorikk';
import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { logEvent } from '../../../utils/frontend-logger';
import { OppfolgingEnhetEndret } from "./components/oppfolgingEndret";

type HistorikkInnslagType = InnstillingsHistorikk | OppgaveHistorikk;

interface OwnProps {
    historikkInnslag: HistorikkInnslagType[];
}

function HistorikkVisning ({historikkInnslag}: OwnProps) {

    const mapTilOppgaveEllerInnstillinger = (historikkElem: HistorikkInnslagType, idx: number, idxForNyesteEnhetEndring: number) => {
        switch(historikkElem.type) {
            case 'OPPRETTET_OPPGAVE':
                return <OppgaveHistorikkKomponent oppgaveHistorikk={historikkElem} key={idx}/>;
            case 'OPPFOLGINGSENHET_ENDRET':
                return <OppfolgingEnhetEndret historikkElement={historikkElem} key={idx} erGjeldendeEnhet={idx === idxForNyesteEnhetEndring}/>;
             default:
                return <InnstillingsHistorikkKomponent instillingsHistorikk={historikkElem} key={idx}/>;
        }
    };

    if (historikkInnslag.length === 0) {
        return <Normaltekst> Ingen historikk </Normaltekst>;
    }

    if (historikkInnslag.length === 1) {
        return (
            mapTilOppgaveEllerInnstillinger(historikkInnslag[0], 0, 0)
        );
    }
    const sortertEtterDatoHistorikkInnslag = historikkInnslag.sort((a, b) => moment(b.dato).diff(a.dato));

    const indexForNyesteEnhetEndring = sortertEtterDatoHistorikkInnslag.findIndex(historikkInnslag => historikkInnslag.type === 'OPPFOLGINGSENHET_ENDRET')

    const historikkKomponenter =
        sortertEtterDatoHistorikkInnslag
            .map((elem: HistorikkInnslagType, idx) =>
                mapTilOppgaveEllerInnstillinger(elem, idx, indexForNyesteEnhetEndring));

    const [head, ...rest] = historikkKomponenter;

    return(
        <Lesmerpanel
            intro={head}
            apneTekst="Vis mer"
            className=""
            lukkTekst="Vis mindre"
            onOpen={() => logEvent('veilarbvisittkortfs.metrikker.vis-historikk-trykket')}
            onClose={() => logEvent('veilarbvisittkortfs.metrikker.lukk-historikk-trykket')}
        >
            {rest}
        </Lesmerpanel>
    );
}

export default HistorikkVisning;
