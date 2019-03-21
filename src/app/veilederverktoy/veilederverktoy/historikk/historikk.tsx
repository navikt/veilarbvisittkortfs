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

function Historikk (props: HistorikkProps) {
    const [innstillingsHistorikk, setInnstillingsHistorikk] = useState([] as InnstillingsHistorikk []);
    const [oppgaveHistorikk, setOppgaveHistorikk] = useState([] as OppgaveHistorikk[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        OppfolgingApi.hentInnstillingsHistorikk(props.fnr)
            .then((innstillingsHistorikkData: InnstillingsHistorikk[]) => setInnstillingsHistorikk(innstillingsHistorikkData));

        OppgaveApi.hentOppgaveHistorikk(props.fnr).
        then((oppgaveHistorikkData: OppgaveHistorikk[]) => {
            setOppgaveHistorikk(oppgaveHistorikkData);
            setIsLoading(false);
        });

    }, []);

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