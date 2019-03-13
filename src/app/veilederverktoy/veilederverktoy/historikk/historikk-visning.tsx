import {InnstillingsHistorikk} from "../../../../types/innstillings-historikk";
import {OppgaveHistorikk} from "../../../../types/oppgave-historikk";
import moment from "moment";
import OppgaveHistorikkKomponent from "./components/oppgavehistorikk";
import InnstillingsHistorikkKomponent from "./components/instillingshistorikk";
import React from "react";
import {Normaltekst, Undertittel} from "nav-frontend-typografi";

interface OwnProps {
    historikkInnslag : (InnstillingsHistorikk | OppgaveHistorikk)[];
}


function HistorikkVisning ({historikkInnslag}:OwnProps) {

    const mapTilOppgaveEllerInnstillinger = (historikkElem: (InnstillingsHistorikk | OppgaveHistorikk)) =>
        historikkElem.type === 'OPPRETTET_OPPGAVE' ?
            <OppgaveHistorikkKomponent oppgaveHistorikk={historikkElem} key={historikkElem.dato}/>
            : <InnstillingsHistorikkKomponent instillingsHistorikk={historikkElem} key={historikkElem.dato}/>;


    if(historikkInnslag.length == 0){
        return (
            <article className="prosess innstillinger__prosess">
                <Undertittel>Historikk</Undertittel>
                <Normaltekst> Ingen historikk</Normaltekst>
            </article>
        )
    }

    if(historikkInnslag.length == 1) {
        return (
            <article className="prosess innstillinger__prosess">
                <Undertittel>Historikk</Undertittel>
                {mapTilOppgaveEllerInnstillinger(historikkInnslag[0])}
            </article>
        )
    }

    const sortertEtterDatoHistorikkInnslag= historikkInnslag.sort((a,b) => moment(b.dato).diff(a.dato));

    const historikkKomponenter =
        sortertEtterDatoHistorikkInnslag
            .map((elem:(InnstillingsHistorikk | OppgaveHistorikk)) =>
                mapTilOppgaveEllerInnstillinger(elem));

    const [forstaHistorikkElemenetet, ...rest] = historikkKomponenter;

    const apneTekst =
        <>
            <Undertittel>Historikk</Undertittel>
            {forstaHistorikkElemenetet}
        </>;


    return(
        <article className="prosess">
            {apneTekst}
            {rest}
        </article>
    )
}

export default HistorikkVisning;