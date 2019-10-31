import { InnstillingsHistorikk } from '../../../../types/innstillings-historikk';
import { OppgaveHistorikk } from '../../../../types/oppgave-historikk';
import moment from 'moment';
import OppgaveHistorikkKomponent from './components/oppgavehistorikk';
import InnstillingsHistorikkKomponent from './components/instillingshistorikk';
import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { ForsteEnhetsEndringKomponent } from './components/forsteEnhetHistorikk';

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
        return <Normaltekst> Ingen historikk</Normaltekst>;
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

    const endretHistorikk: HistorikkInnslagType[] = sortertEtterDatoHistorikkInnslag
        .filter(innstilling => 'OPPFOLGINGSENHET_ENDRET' === innstilling.type);

    if (endretHistorikk.length >= 1) {
        const indexForReversertListe = sortertEtterDatoHistorikkInnslag
            .slice()
            .reverse()
            .findIndex(historikk  => historikk.type === 'OPPFOLGINGSENHET_ENDRET');
        const listeLengde = sortertEtterDatoHistorikkInnslag.length - 1;

        let indexForEldsteEnhetEndring = indexForReversertListe >= 0 ? listeLengde - indexForReversertListe : indexForReversertListe;

        const eldsteInnslag = endretHistorikk[endretHistorikk.length - 1];
        const forsteEnhetEndring = ForsteEnhetsEndringKomponent(eldsteInnslag as InnstillingsHistorikk);
        historikkKomponenter.splice(indexForEldsteEnhetEndring, 1, forsteEnhetEndring);
    }

    const [head, ...rest] = historikkKomponenter;

    return(
        <Lesmerpanel
            intro={head}
            apneTekst="Vis mer"
            className=""
            lukkTekst="Vis mindre"
        >
            {rest}
        </Lesmerpanel>
    );
}

export default HistorikkVisning;