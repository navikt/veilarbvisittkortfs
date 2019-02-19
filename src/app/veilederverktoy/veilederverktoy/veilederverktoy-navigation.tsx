import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import Prosesser from './prosess/prosesser';
import * as React from 'react';
import StartEskalering from './start-eskalering/start-eskalering';
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
        default:
            return null;
    }
}

const mapStateToProps = (state: Appstate): StateProps => ({
    location: state.navigation.location,
});

export default connect<StateProps>(mapStateToProps)(hiddenIf(VeilederVerktoyNavigation));