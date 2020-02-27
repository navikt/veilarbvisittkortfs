import React from 'react';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import OppfolgingApi from '../../../api/oppfolging-api';
import { InnstillingsHistorikk } from '../../../types/innstillings-historikk';
import OppgaveApi from '../../../api/oppgave-api';
import { OppgaveHistorikk } from '../../../types/oppgave-historikk';
import HistorikkVisning from './historikk-visning';
import './historikk.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import useFetch, { isPending, hasData, hasError } from '@nutgaard/use-fetch';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useSelector } from 'react-redux';
import VeilederVerktoyModal from '../veilederverktoy-components/veilederverktoy-modal';
import { LasterModal } from '../../components/lastermodal/laster-modal';

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
        <VeilederVerktoyModal visConfirmDialog={false} className="historikk__modal">
            <article className="prosess">
                <div className="modal-info-tekst">
                    <Innholdstittel className="modal-info-tekst__overskrift">Historikk</Innholdstittel>
                </div>
                <HistorikkVisning historikkInnslag={[...innstillingsHistorikk.data, ...oppgaveHistorikk.data]} />
            </article>
        </VeilederVerktoyModal>
    );
}

export default Historikk;
