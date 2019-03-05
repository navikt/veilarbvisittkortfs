import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import Prosesser from './prosess/prosesser';
import * as React from 'react';
import StartEskalering from './start-eskalering/start-eskalering';
import StarManuellOppfolging from './start-manuell-oppfolging/start-manuell-oppfolging';
import StartManuellOppfolgingKvittering from './start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import StarKvpPeriode from './start-kvp-periode/start-kvp-periode';
import StartKVPKvittering from './start-kvp-periode/start-kvp-periode-kvittering';
import StoppKvpPeriode from './stopp-kvp-periode/stopp-kvp-periode';
import StoppKVPKvittering from './stopp-kvp-periode/stopp-kvp-periode-kvittering';
import StartDigitalOppfolgingKvittering from './start-digital-oppfolging/start-digital-oppfolging-kvittering';
import StartDigitalOppfolging from './start-digital-oppfolging/start-digital-oppfolging';
import hiddenIf from '../../components/hidden-if/hidden-if';
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
        case 'start_eskalering_kvittering':
            return <StartEskalering/>;
        case 'manuell_oppfolging':
            return <StarManuellOppfolging/>;
        case 'sett_manuell_kvittering':
            return <StartManuellOppfolgingKvittering/>;
        case 'start_digital_oppfolging':
            return <StartDigitalOppfolging/>;
        case 'start_digital_oppfoling_kvitterig':
            return <StartDigitalOppfolgingKvittering/>;
        case 'start_kvp_periode':
            return <StarKvpPeriode/>;
        case 'start_kvp_periode_kvittering':
            return <StartKVPKvittering/>;
        case 'stopp_kvp_periode':
            return <StoppKvpPeriode/>;
        case 'stopp_kvp_periode_kvittering':
            return <StoppKVPKvittering/>;
        default:
            return null;
    }
}

const mapStateToProps = (state: Appstate): StateProps => ({
    location: state.navigation.location,
});

export default connect<StateProps>(mapStateToProps)(hiddenIf(VeilederVerktoyNavigation));