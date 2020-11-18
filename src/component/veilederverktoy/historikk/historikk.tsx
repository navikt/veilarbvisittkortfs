import React from 'react';
import HistorikkVisning from './historikk-visning';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store-midlertidig/app-store';
import { useFetchInstillingsHistorikk, useFetchOppgaveHistorikk } from '../../../api/api-midlertidig';
import { hasAnyFailed, isAnyLoading } from '../../../api/utils';
import './historikk.less';

function Historikk() {
    const { brukerFnr } = useAppStore();

    const fetchInnstillingsHistorikk = useFetchInstillingsHistorikk(brukerFnr);
    const fetchOppgaveHistorikk = useFetchOppgaveHistorikk(brukerFnr);

    if (isAnyLoading(fetchInnstillingsHistorikk, fetchOppgaveHistorikk)) {
        return <LasterModal />;
    } else if (hasAnyFailed(fetchInnstillingsHistorikk, fetchOppgaveHistorikk)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (!fetchInnstillingsHistorikk.data && !fetchOppgaveHistorikk.data) {
        return null;
    }

    const historikk = [...(fetchInnstillingsHistorikk.data || []), ...(fetchOppgaveHistorikk.data || [])];

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <article className="prosess blokk-s">
                <HistorikkVisning historikkInnslag={historikk} />
            </article>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
