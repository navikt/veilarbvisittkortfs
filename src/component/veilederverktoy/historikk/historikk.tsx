import React, { useEffect } from 'react';
import HistorikkVisning from './historikk-visning';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store/app-store';
import { hasAnyFailed, isAnyLoading } from '../../../api/utils';
import './historikk.less';
import { fetchOppgaveHistorikk, OppgaveHistorikkInnslag } from '../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchInstillingsHistorikk, InnstillingHistorikkInnslag } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, hentEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';
import { fetchVeilederDataListe } from '../../../api/veilarbveileder';
import { isNonEmptyArray, isString } from '../../../util/type/type-guards';
import { Common } from '../../../util/type/utility-types';
import { filterUnique } from '../../../util/utils';

type HistorikkInnslag = Common<InnstillingHistorikkInnslag, OppgaveHistorikkInnslag>;

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

function mapTilIdentListe(historikkInnslag: HistorikkInnslag[] | undefined): string[] {
    if (isNonEmptyArray(historikkInnslag)) {
        return historikkInnslag.map(hi => hi.opprettetAvBrukerId).filter(isString);
    }

    return [];
}

function Historikk() {
    const { brukerFnr } = useAppStore();

    const innstillingsHistorikkFetcher = useAxiosFetcher(fetchInstillingsHistorikk);
    const oppgaveHistorikkFetcher = useAxiosFetcher(fetchOppgaveHistorikk);
    const eskaleringsvarselHistorikkFetcher = useAxiosFetcher(hentEskaleringsvarselHistorikk);
    const veilederDataListeFetcher = useAxiosFetcher(fetchVeilederDataListe);

    useEffect(() => {
        innstillingsHistorikkFetcher.fetch(brukerFnr);
        oppgaveHistorikkFetcher.fetch(brukerFnr);
        eskaleringsvarselHistorikkFetcher.fetch(brukerFnr);

        const veilederIdentListe = filterUnique([
            ...mapTilIdentListe(innstillingsHistorikkFetcher.data),
            ...mapTilIdentListe(oppgaveHistorikkFetcher.data)
        ]);

        if (isNonEmptyArray(veilederIdentListe)) {
            veilederDataListeFetcher.fetch(veilederIdentListe);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    if (
        isAnyLoading(
            innstillingsHistorikkFetcher,
            oppgaveHistorikkFetcher,
            eskaleringsvarselHistorikkFetcher,
            veilederDataListeFetcher
        )
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
        innstillingsHistorikkFetcher.data?.map(ih => ({
            ...ih,
            opprettetAvBrukerNavn: veilederDataListeFetcher.data?.find(vd => ih.opprettetAvBrukerId === vd.ident)?.navn
        })) || [];
    const oppgaveHistorikk = oppgaveHistorikkFetcher.data || [];
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
