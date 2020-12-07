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

function Historikk() {
    const { brukerFnr } = useAppStore();

    const innstillingsHistorikkFetcher = useAxiosFetcher(fetchInstillingsHistorikk);
    const oppgaveHistorikkFetcher = useAxiosFetcher(fetchOppgaveHistorikk);

    useEffect(() => {
        innstillingsHistorikkFetcher.fetch(brukerFnr);
        oppgaveHistorikkFetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    if (isAnyLoading(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher)) {
        return <LasterModal />;
    } else if (hasAnyFailed(innstillingsHistorikkFetcher, oppgaveHistorikkFetcher)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (!innstillingsHistorikkFetcher.data && !oppgaveHistorikkFetcher.data) {
        return null;
    }

    const historikk = [...(innstillingsHistorikkFetcher.data || []), ...(oppgaveHistorikkFetcher.data || [])];

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <article className="prosess blokk-s">
                <HistorikkVisning historikkInnslag={historikk} />
            </article>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
