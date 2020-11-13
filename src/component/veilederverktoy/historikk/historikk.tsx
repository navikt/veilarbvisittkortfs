import React from 'react';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import OppfolgingApi from '../../../api/oppfolging-api';
import OppgaveApi from '../../../api/oppgave-api';
import HistorikkVisning from './historikk-visning';
import './historikk.less';
import useFetch, { isPending, hasData, hasError } from '@nutgaard/use-fetch';
import { useSelector } from 'react-redux';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { InnstillingsHistorikk } from '../../../api/data/innstillings-historikk';
import { OppgaveHistorikk } from '../../../api/data/oppgave-historikk';

function Historikk() {
    const fnr = useSelector(OppfolgingSelector.selectFnr);

    const innstillingsHistorikk = useFetch<InnstillingsHistorikk[]>(OppfolgingApi.hentInnstillingsHistorikk(fnr));
    const oppgaveHistorikk = useFetch<OppgaveHistorikk[]>(OppgaveApi.hentOppgaveHistorikk(fnr));

    if (isPending(innstillingsHistorikk) || isPending(oppgaveHistorikk)) {
        return <LasterModal />;
    } else if (hasError(oppgaveHistorikk) || hasError(innstillingsHistorikk)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (!hasData(oppgaveHistorikk) || !hasData(innstillingsHistorikk)) {
        return null;
    }

    return (
        <VeilederVerktoyModal className="historikk__modal" tittel="Historikk">
            <article className="prosess blokk-s">
                <HistorikkVisning historikkInnslag={[...innstillingsHistorikk.data, ...oppgaveHistorikk.data]} />
            </article>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
