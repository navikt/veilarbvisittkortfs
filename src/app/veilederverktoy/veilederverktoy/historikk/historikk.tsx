import React from 'react';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import OppfolgingApi from '../../../../api/oppfolging-api';
import { InnstillingsHistorikk } from '../../../../types/innstillings-historikk';
import OppgaveApi from '../../../../api/oppgave-api';
import { OppgaveHistorikk } from '../../../../types/oppgave-historikk';
import HistorikkVisning from './historikk-visning';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './historikk.less';
import { Undertittel } from 'nav-frontend-typografi';
import useFetch, { isPending, hasData, hasError } from '@nutgaard/use-fetch';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useSelector } from 'react-redux';

function Historikk() {
    const fnr = useSelector(OppfolgingSelector.selectFnr);

    const innstillingsHistorikk = useFetch<InnstillingsHistorikk[]>(OppfolgingApi.hentInnstillingsHistorikk(fnr));
    const oppgaveHistorikk = useFetch<OppgaveHistorikk[]>(OppgaveApi.hentOppgaveHistorikk(fnr));

    if (isPending(innstillingsHistorikk) || isPending(oppgaveHistorikk)) {
        return <NavFrontendSpinner />;
    } else if (hasError(oppgaveHistorikk) || hasError(innstillingsHistorikk)) {
        return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>;
    } else if (!hasData(oppgaveHistorikk) || !hasData(innstillingsHistorikk)) {
        return null;
    }

    return (
        <article className="prosess">
            <Undertittel>Historikk</Undertittel>
            <HistorikkVisning historikkInnslag={[...innstillingsHistorikk.data, ...oppgaveHistorikk.data]} />
        </article>
    );
}

export default Historikk;
