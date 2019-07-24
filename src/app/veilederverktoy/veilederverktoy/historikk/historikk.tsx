import React, { useEffect, useState } from 'react';
import { Appstate } from '../../../../types/appstate';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import OppfolgingApi from '../../../../api/oppfolging-api';
import { InnstillingsHistorikk } from '../../../../types/innstillings-historikk';
import { connect } from 'react-redux';
import OppgaveApi from '../../../../api/oppgave-api';
import { OppgaveHistorikk } from '../../../../types/oppgave-historikk';
import HistorikkVisning from './historikk-visning';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './historikk.less';
import { Undertittel } from 'nav-frontend-typografi';

interface StateProps {
    fnr: string;
}

type HistorikkProps = StateProps;

function Historikk ({fnr}: HistorikkProps) {
    const [innstillingsHistorikk, setInnstillingsHistorikk] = useState([] as InnstillingsHistorikk []);
    const [oppgaveHistorikk, setOppgaveHistorikk] = useState([] as OppgaveHistorikk[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        OppfolgingApi.hentInnstillingsHistorikk(fnr)
            .then((innstillingsHistorikkData: InnstillingsHistorikk[]) => setInnstillingsHistorikk(innstillingsHistorikkData));

        OppgaveApi.hentOppgaveHistorikk(fnr)
            .then((oppgaveHistorikkData: OppgaveHistorikk[]) => {
                setOppgaveHistorikk(oppgaveHistorikkData);
                setIsLoading(false);
            });

    }, [fnr]);

    if (isLoading) {
        return <NavFrontendSpinner type="XL"/>;
    }

    return (
        <article className="prosess">
            <Undertittel>Historikk</Undertittel>
            <HistorikkVisning historikkInnslag={[...innstillingsHistorikk, ...oppgaveHistorikk]}/>
        </article>

    );

}

const mapStateToProps = (state: Appstate): StateProps => ({
    fnr: OppfolgingSelector.selectFnr(state),
});

export default connect<StateProps>(mapStateToProps)(Historikk);