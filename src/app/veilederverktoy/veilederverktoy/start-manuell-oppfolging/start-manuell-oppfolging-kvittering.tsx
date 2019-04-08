import React, { useEffect } from 'react';
import Kvittering from '../prosess/kvittering';
import { Appstate } from '../../../../types/appstate';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import { connect } from 'react-redux';
import { fetchRegistreringData } from '../../../../api/registrering-api';
import { logEvent } from '../../../utils/frontend-logger';

interface OwnProps {
    begrunnelse?: string;
}

interface StateProps {
    erKRR: boolean;
    fnr: string;
}

type StartOppfolgingKvittering = OwnProps & StateProps;

function loggMetrikk(props: StartOppfolgingKvittering) {
    fetchRegistreringData(props.fnr)
        .then(registreringData => {
            const erManueltRegistrert = !!registreringData.registrering.manueltRegistrertAv;
            const logFields = {
                brukerType: registreringData.type,
                erKRR: props.erKRR,
                erManueltRegistrert
            };
            logEvent('veilarbvisittkortfs.metrikker.manuell_oppfolging', logFields);
        }).catch(); // Squelch errors
}

function StartManuellOppfolgingKvittering(props: StartOppfolgingKvittering) {
    useEffect(() => loggMetrikk(props), []);
    return (
        <Kvittering
            tittelId="innstillinger.modal.manuell.overskrift"
            alertStripeTekstId="innstillinger.prosess.manuell.kvittering"
            alertStripeTekstValues={{begrunnelse: props.begrunnelse}}
        />
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    erKRR: OppfolgingSelector.selectErKRR(state),
    fnr: OppfolgingSelector.selectFnr(state)
});

export default connect(mapStateToProps)(StartManuellOppfolgingKvittering);
