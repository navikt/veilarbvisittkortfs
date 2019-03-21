import React from 'react';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import PersonaliaSelectors from '../../../../store/personalia/selectors';
import Kvittering from '../prosess/kvittering';

interface StateProps {
    navn: string;
}

type StartOppfolgingKvittering = StateProps ;

function StartKVPKvittering({navn}: StartOppfolgingKvittering) {
    return (
        <Kvittering
            tittelId="innstillinger.prosess.start-kvp.tittel"
            alertStripeTekstId="innstillinger.modal.start-kvp.kvittering.ok"
            alertStripeTekstValues={{navn}}
        />
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navn: PersonaliaSelectors.selectSammensattNavn(state)
});

export default connect<StateProps>(mapStateToProps)(StartKVPKvittering);