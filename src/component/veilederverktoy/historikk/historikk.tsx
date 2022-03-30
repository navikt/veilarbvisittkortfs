import React, { useEffect } from 'react';
import HistorikkVisning from './historikk-visning';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store/app-store';
import { hasAnyFailed, isAnyLoading } from '../../../api/utils';
import './historikk.less';
import { fetchOppgaveHistorikk } from '../../../api/veilarboppgave';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchInstillingsHistorikk } from '../../../api/veilarboppfolging';
import { EskaleringsvarselHistorikkInnslag, hentEskaleringsvarselHistorikk } from '../../../api/veilarbdialog';

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

function Historikk() {
    const { brukerFnr } = useAppStore();

    const innstillingsHistorikkFetcher = useAxiosFetcher(fetchInstillingsHistorikk);
    const oppgaveHistorikkFetcher = useAxiosFetcher(fetchOppgaveHistorikk);
    const eskaleringsvarselHistorikkFetcher = useAxiosFetcher(hentEskaleringsvarselHistorikk);

    useEffect(() => {
        innstillingsHistorikkFetcher.fetch(brukerFnr);
        oppgaveHistorikkFetcher.fetch(brukerFnr);
        eskaleringsvarselHistorikkFetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    if (isAnyLoading(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher, eskaleringsvarselHistorikkFetcher)) {
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

    const innstillingshistorikk = innstillingsHistorikkFetcher.data || [];
    const oppgaveHistorikk = oppgaveHistorikkFetcher.data || [];
    const eskaleringsvarselHistorikk = eskaleringsvarselHistorikkTilEvent(eskaleringsvarselHistorikkFetcher.data || []);

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <article className="prosess blokk-s">
                <HistorikkVisning
                    innstillingHistorikk={innstillingshistorikk}
                    oppgaveHistorikk={oppgaveHistorikk}
                    eskaleringsvarselHistorikk={eskaleringsvarselHistorikk}
                />
            </article>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
