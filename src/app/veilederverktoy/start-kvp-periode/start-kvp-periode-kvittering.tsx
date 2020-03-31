import React from 'react';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import Kvittering from '../prosess/kvittering';

interface StateProps {
    navn: string;
}

type StartOppfolgingKvittering = StateProps;

function StartKVPKvittering({ navn }: StartOppfolgingKvittering) {
    return (
        <Kvittering
            tittel="Start periode i Kvalifiseringsprogrammet (KVP)"
            alertStripeTekst="Du har startet en KVP-periode for brukeren. Bare veiledere i din enhet har nå tilgang til dialoger, aktiviteter og mål som blir opprettet i KVP-perioden."
        />
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navn: PersonaliaSelectors.selectSammensattNavn(state)
});

export default connect<StateProps>(mapStateToProps)(StartKVPKvittering);
