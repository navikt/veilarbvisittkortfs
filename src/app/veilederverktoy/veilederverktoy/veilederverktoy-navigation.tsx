import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import Prosesser from './prosess/prosesser';
import * as React from 'react';
import StartEskalering from './start-eskalering/start-eskalering';
import StarManuellOppfolging from './start-manuell-oppfolging/start-manuell-oppfolging';
import StartManuellOppfolgingKvittering from './start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import StarKvpPeriode from './start-kvp-periode/start-kvp-periode';
import StoppKvpPeriode from './stopp-kvp-periode/stopp-kvp-periode';
import hiddenIf from '../../components/hidden-if';
import { StringOrNothing } from '../../../types/utils/stringornothings';

interface StateProps {
    location: StringOrNothing;
}

type VeilederVerktoyNavigationProps = StateProps;

function VeilederVerktoyNavigation(props: VeilederVerktoyNavigationProps) {
    switch (props.location) {
        case 'prosesser':
            return <Prosesser/>;
        case 'start_eskalering':
            return <StartEskalering/>;
        case 'manuell_oppfolging':
            return <StarManuellOppfolging/>;
        case 'sett_manuell_kvittering':
            return <StartManuellOppfolgingKvittering/>;
        case 'start_kvp_periode':
            return <StarKvpPeriode/>;
        case 'stopp_kvp_periode':
            return <StoppKvpPeriode/>
        default:
            return null;
    }
}

const mapStateToProps = (state: Appstate): StateProps => ({
    location: state.navigation.location,
});

export default connect<StateProps>(mapStateToProps)(hiddenIf(VeilederVerktoyNavigation));