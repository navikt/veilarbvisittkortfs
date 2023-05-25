import OppgaveHistorikkKomponent from './components/oppgavehistorikk';
import InnstillingsHistorikkKomponent from './components/innstillingshistorikk';
import React from 'react';
import { OppfolgingEnhetEndret } from './components/oppfolgingEndret';
import dayjs from 'dayjs';
import { InnstillingHistorikkInnslag } from '../../../api/veilarboppfolging';
import { OppgaveHistorikkInnslag } from '../../../api/veilarboppgave';
import { EskaleringsvarselHistorikkInnslag } from '../../../api/veilarbdialog';
import EskaleringsvarselHistorikkKomponent from './components/eskaleringsvarselHistorikk';
import {BodyShort} from "@navikt/ds-react";

type Historikk = InnstillingHistorikk | OppgaveHistorikk | EskaleringsvarselHistorikk;

interface InnstillingHistorikk {
    type: 'innstilling';
    innslag: InnstillingHistorikkInnslag;
}

interface OppgaveHistorikk {
    type: 'oppgave';
    innslag: OppgaveHistorikkInnslag;
}

interface EskaleringsvarselHistorikk {
    type: 'eskalering';
    innslag: EskaleringsvarselHistorikkInnslag;
}

interface HistorikkVisningProps {
    innstillingHistorikk: InnstillingHistorikkInnslag[];
    oppgaveHistorikk: OppgaveHistorikkInnslag[];
    eskaleringsvarselHistorikk: EskaleringsvarselHistorikkInnslag[];
}

function mapTilKomponent(
    historikk: Historikk,
    indeks: number,
    indeksForNyesteEnhetEndring: number
): React.ReactElement {
    if (erInnstillingshistorikk(historikk)) {
        if (historikk.innslag.type === 'OPPFOLGINGSENHET_ENDRET') {
            return (
                <OppfolgingEnhetEndret
                    historikkElement={historikk.innslag}
                    key={indeks}
                    erGjeldendeEnhet={indeks === indeksForNyesteEnhetEndring}
                />
            );
        }

        return <InnstillingsHistorikkKomponent innstillingsHistorikk={historikk.innslag} key={indeks} />;
    } else if (erOppgaveHistorikk(historikk)) {
        return <OppgaveHistorikkKomponent oppgaveHistorikk={historikk.innslag} key={indeks} />;
    } else if (erEskaleringsvarselHistorikk(historikk)) {
        return <EskaleringsvarselHistorikkKomponent innslag={historikk.innslag} key={indeks} />;
    } else {
        return <></>;
    }
}

function opprettHistorikk(
    innstillingHistorikkInnslag: InnstillingHistorikkInnslag[],
    oppgaveHistorikkInnslag: OppgaveHistorikkInnslag[],
    eskaleringsvarselHistorikkInnslag: EskaleringsvarselHistorikkInnslag[]
): Historikk[] {
    let historikk: Historikk[] = [];

    historikk = historikk.concat(innstillingHistorikkInnslag.map(ih => ({ type: 'innstilling', innslag: ih })));
    historikk = historikk.concat(oppgaveHistorikkInnslag.map(oh => ({ type: 'oppgave', innslag: oh })));
    historikk = historikk.concat(eskaleringsvarselHistorikkInnslag.map(eh => ({ type: 'eskalering', innslag: eh })));

    return historikk;
}

function hentDato(historikk: Historikk): string {
    if (erInnstillingshistorikk(historikk)) {
        return historikk.innslag.dato;
    } else if (erOppgaveHistorikk(historikk)) {
        return historikk.innslag.dato;
    } else if (erEskaleringsvarselHistorikk(historikk)) {
        return historikk.innslag.avsluttetDato || historikk.innslag.opprettetDato;
    } else {
        return new Date(0).toISOString();
    }
}

function erInnstillingshistorikk(historikk: Historikk): historikk is InnstillingHistorikk {
    return historikk.type === 'innstilling';
}

function erOppgaveHistorikk(historikk: Historikk): historikk is OppgaveHistorikk {
    return historikk.type === 'oppgave';
}

function erEskaleringsvarselHistorikk(historikk: Historikk): historikk is EskaleringsvarselHistorikk {
    return historikk.type === 'eskalering';
}

function HistorikkVisning({
    innstillingHistorikk,
    oppgaveHistorikk,
    eskaleringsvarselHistorikk
}: HistorikkVisningProps) {
    const historikk = opprettHistorikk(innstillingHistorikk, oppgaveHistorikk, eskaleringsvarselHistorikk).sort(
        (h1, h2) => {
            const d1 = hentDato(h1);
            const d2 = hentDato(h2);

            return dayjs(d2).diff(d1);
        }
    );

    if (historikk.length === 0) {
        return <BodyShort> Ingen historikk </BodyShort>;
    }

    if (historikk.length === 1) {
        return mapTilKomponent(historikk[0], 0, 0);
    }

    const indexForNyesteEnhetEndring = historikk.findIndex(
        h => erInnstillingshistorikk(h) && h.innslag.type === 'OPPFOLGINGSENHET_ENDRET'
    );

    return (
        <ul className="ustilet">
            {historikk.map((elem, idx) => (
                <li key={`historikk_visning_${idx}`}>{mapTilKomponent(elem, idx, indexForNyesteEnhetEndring)}</li>
            ))}
        </ul>
    );
}

export default HistorikkVisning;
