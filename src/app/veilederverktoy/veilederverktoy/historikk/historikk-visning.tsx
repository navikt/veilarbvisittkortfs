import {InnstillingsHistorikk} from "../../../../types/innstillings-historikk";
import {OppgaveHistorikk} from "../../../../types/oppgave-historikk";
import moment from "moment";
import OppgaveHistorikkKomponent from "./oppgave";
import InnstillingsHistorikkKomponent from "./instillingshistorikk";
import React from "react";
import {Normaltekst, Undertittel} from "nav-frontend-typografi";

interface OwnProps {
    historikkInnslag : (InnstillingsHistorikk | OppgaveHistorikk)[];
}


function HistorikkVisning ({historikkInnslag}:OwnProps) {

    if(historikkInnslag.length == 0){
        return (
            <div>
                <Undertittel>Historikk</Undertittel>
                <Normaltekst> Ingen historikk</Normaltekst>
            </div>
        )
    }

    if(historikkInnslag.length == 1) {
        const historikkElem =  historikkInnslag[1];
        const elem = historikkElem.type === 'OPPRETTET_OPPGAVE' ?
            <OppgaveHistorikkKomponent oppgaveHistorikk={historikkElem}/>
            : <InnstillingsHistorikkKomponent instillingsHistorikk={historikkElem}/>
        return (
            <div>
                <Undertittel>Historikk</Undertittel>
                {elem}
            </div>
        )
    }

    const sortertEtterDatoHistorikkInnslag= historikkInnslag.sort((a,b) => moment(b.dato).diff(a.dato));

    const historikkKomponenter = sortertEtterDatoHistorikkInnslag.map((elem:(InnstillingsHistorikk | OppgaveHistorikk)) =>
        elem.type === 'OPPRETTET_OPPGAVE' ?
            <OppgaveHistorikkKomponent oppgaveHistorikk={elem}/>
            : <InnstillingsHistorikkKomponent instillingsHistorikk={elem}/>
    );

    const [forstaHistorikkElemenetet, ...rest] = historikkKomponenter;

    const apneTekst =
        <div>
            <Undertittel>Historikk</Undertittel>
            {forstaHistorikkElemenetet}
        </div>;


    return(
        <div>
        {apneTekst}
            {rest}
        </div>
    )
}

export default HistorikkVisning;