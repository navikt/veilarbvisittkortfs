import React, { useEffect } from 'react';
import HistorikkVisning from './historikk-visning';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store/app-store';
import { hasAnyFailed, isAnyLoading, isAnyLoadingOrNotStarted } from '../../../api/utils';
import './historikk.less';
import { fetchOppgaveHistorikk } from '../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchInstillingsHistorikk, InnstillingsHistorikkOpprettetAvType } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, hentEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';
import { fetchVeilederDataListe, VeilederData } from '../../../api/veilarbveileder';
import { isNonEmptyArray, isString } from '../../../util/type/type-guards';
import { StringOrNothing } from '../../../util/type/utility-types';
import { filterUnique } from '../../../util/utils';

type HistorikkInnslag = {
    opprettetAv: InnstillingsHistorikkOpprettetAvType;
    opprettetAvBrukerId: StringOrNothing;
    opprettetAvBrukerNavn?: StringOrNothing;
};

function eskaleringsvarselHistorikkTilEvent(
    historikk: EskaleringsvarselHistorikkInnslag[]
): EskaleringsvarselHistorikkInnslag[] {
    const eventHistorikk: EskaleringsvarselHistorikkInnslag[] = [];

    historikk.forEach(h => {
        eventHistorikk.push({
            id: h.id,
            tilhorendeDialogId: h.tilhorendeDialogId,
            opprettetAv: h.opprettetAv,
            opprettetDato: h.opprettetDato,
            opprettetBegrunnelse: h.opprettetBegrunnelse,
            avsluttetDato: null,
            avsluttetAv: null,
            avsluttetBegrunnelse: null
        });

        if (h.avsluttetAv != null) {
            eventHistorikk.push({
                id: h.id,
                tilhorendeDialogId: h.tilhorendeDialogId,
                opprettetAv: h.opprettetAv,
                opprettetDato: h.opprettetDato,
                opprettetBegrunnelse: h.opprettetBegrunnelse,
                avsluttetDato: h.avsluttetDato,
                avsluttetAv: h.avsluttetAv,
                avsluttetBegrunnelse: h.avsluttetBegrunnelse
            });
        }
    });

    return eventHistorikk;
}

function mapTilIdentListe<T extends HistorikkInnslag>(
    historikkInnslag: T[] | undefined,
    opprettetAvFilter: InnstillingsHistorikkOpprettetAvType = 'NAV'
): string[] {
    if (isNonEmptyArray(historikkInnslag)) {
        return historikkInnslag
            .filter(hi => hi.opprettetAv === opprettetAvFilter)
            .map(hi => hi.opprettetAvBrukerId)
            .filter(isString);
    }

    return [];
}

function dekorerHistorikkInnslagMedOpprettetAvBrukerNavn<T extends HistorikkInnslag>(
    historikkInnslag: T[] | undefined,
    veilederDataListe: VeilederData[] | undefined
): T[] | undefined {
    return historikkInnslag?.map(ih => {
        return {
            ...ih,
            opprettetAvBrukerNavn: veilederDataListe?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn
        };
    });
}

function Historikk() {
    const { brukerFnr } = useAppStore();

    const innstillingsHistorikkFetcher = useAxiosFetcher(fetchInstillingsHistorikk);
    const oppgaveHistorikkFetcher = useAxiosFetcher(fetchOppgaveHistorikk);
    const eskaleringsvarselHistorikkFetcher = useAxiosFetcher(hentEskaleringsvarselHistorikk);

    const {
        fetch: hentVeilederDataListe,
        data: veilederDataListeData,
        loading: veilederDataListeLoading
    } = useAxiosFetcher(fetchVeilederDataListe);

    useEffect(() => {
        innstillingsHistorikkFetcher.fetch(brukerFnr);
        oppgaveHistorikkFetcher.fetch(brukerFnr);
        eskaleringsvarselHistorikkFetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    useEffect(() => {
        const skalHenteVeilederDataListe = !isAnyLoadingOrNotStarted(
            innstillingsHistorikkFetcher,
            oppgaveHistorikkFetcher
        );

        if (skalHenteVeilederDataListe) {
            const veilederIdentListe = filterUnique([
                ...mapTilIdentListe(innstillingsHistorikkFetcher.data),
                ...mapTilIdentListe(oppgaveHistorikkFetcher.data)
            ]);

            if (isNonEmptyArray(veilederIdentListe)) {
                hentVeilederDataListe({ identer: veilederIdentListe });
            }
        }
    }, [innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, hentVeilederDataListe]);

    if (
        isAnyLoading(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher) ||
        veilederDataListeLoading
    ) {
        return <LasterModal />;
    } else if (hasAnyFailed(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (
        !innstillingsHistorikkFetcher.data &&
        !oppgaveHistorikkFetcher.data &&
        !eskaleringsvarselHistorikkFetcher.data
    ) {
        return null;
    }

    const innstillingHistorikk =
        dekorerHistorikkInnslagMedOpprettetAvBrukerNavn(innstillingsHistorikkFetcher.data, veilederDataListeData) || [];
    const oppgaveHistorikk =
        dekorerHistorikkInnslagMedOpprettetAvBrukerNavn(oppgaveHistorikkFetcher.data, veilederDataListeData) || [];
    const eskaleringsvarselHistorikk = eskaleringsvarselHistorikkTilEvent(eskaleringsvarselHistorikkFetcher.data || []);

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <div className="prosess blokk-s">
                <HistorikkVisning
                    innstillingHistorikk={innstillingHistorikk}
                    oppgaveHistorikk={oppgaveHistorikk}
                    eskaleringsvarselHistorikk={eskaleringsvarselHistorikk}
                />
            </div>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
