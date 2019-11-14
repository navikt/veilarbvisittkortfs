import { InnstillingsHistorikk } from '../../../../types/innstillings-historikk';
import { OppgaveHistorikk } from '../../../../types/oppgave-historikk';
import moment from 'moment';
import OppgaveHistorikkKomponent from './components/oppgavehistorikk';
import InnstillingsHistorikkKomponent from './components/instillingshistorikk';
import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { logEvent } from '../../../utils/frontend-logger';

type HistorikkInnslagType = InnstillingsHistorikk | OppgaveHistorikk;

interface OwnProps {
    historikkInnslag: HistorikkInnslagType[];
}

function HistorikkVisning ({historikkInnslag}: OwnProps) {

    const mapTilOppgaveEllerInnstillinger = (historikkElem: HistorikkInnslagType, idx: number) =>
        historikkElem.type === 'OPPRETTET_OPPGAVE'
            ? <OppgaveHistorikkKomponent oppgaveHistorikk={historikkElem} key={idx}/>
            : <InnstillingsHistorikkKomponent instillingsHistorikk={historikkElem} key={idx}/> ;

    if (historikkInnslag.length === 0) {
        return <Normaltekst> Ingen historikk </Normaltekst>;
    }

    if (historikkInnslag.length === 1) {
        return (
            mapTilOppgaveEllerInnstillinger(historikkInnslag[0], 0)
        );
    }
    const sortertEtterDatoHistorikkInnslag = historikkInnslag.sort((a, b) => moment(b.dato).diff(a.dato));

    const historikkKomponenter =
        sortertEtterDatoHistorikkInnslag
            .map((elem: HistorikkInnslagType, idx) =>
                mapTilOppgaveEllerInnstillinger(elem, idx));

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