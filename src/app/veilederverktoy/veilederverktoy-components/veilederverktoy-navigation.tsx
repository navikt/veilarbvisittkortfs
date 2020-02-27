import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import * as React from 'react';
import StartEskalering from '../start-eskalering/start-eskalering';
import StartEskaleringKvittering from '../start-eskalering/start-eskalering-kvittering';
import StarManuellOppfolging from '../start-manuell-oppfolging/start-manuell-oppfolging';
import StartManuellOppfolgingKvittering from '../start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import StarKvpPeriode from '../start-kvp-periode/start-kvp-periode';
import StartKVPKvittering from '../start-kvp-periode/start-kvp-periode-kvittering';
import StoppKvpPeriode from '../stopp-kvp-periode/stopp-kvp-periode';
import StoppKVPKvittering from '../stopp-kvp-periode/stopp-kvp-periode-kvittering';
import StartDigitalOppfolgingKvittering from '../start-digital-oppfolging/start-digital-oppfolging-kvittering';
import StartDigitalOppfolging from '../start-digital-oppfolging/start-digital-oppfolging';
import hiddenIf from '../../components/hidden-if/hidden-if';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import OpprettOppgave from '../opprett-oppgave/opprett-oppgave';
import OpprettOppgaveKvittering from '../opprett-oppgave/oprett-oppgave-kvittering';
import AvsluttOppfolging from '../avsluttoppfolging/avslutt-oppfolging';
import AvsluttOppfolgingKvittering from '../avsluttoppfolging/avslutt-oppfolging-kvittering';
import StoppEskalering from '../stopp-eskalering/stopp-eskalering';
import AvsluttOppfolgingBekreft from '../avsluttoppfolging/avslutt-oppfolging-bekreft';
import StopEskaleringKvittering from '../stopp-eskalering/stopp-esklaring-kvittering';
import { FeilModal } from '../prosess/feil-modal';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import Historikk from '../historikk/historikk';
import { PropsWithChildren } from 'react';
import ArbeidslisteController from '../../arbeidsliste/arbeidsliste-controller';
import TildelVeileder from '../tildel-veileder/tildel-veileder';
import { TildelVeilederKvittering } from '../tildel-veileder/tildel-veileder-kvittering';
import { FeilTildelingModal } from '../tildel-veileder/tildel-veileder-feil-modal';

interface StateProps {
    navigation: {
        location: StringOrNothing;
        begrunnelse?: string;
    };
}

type VeilederVerktoyNavigationProps = StateProps;

function VeilederVerktoyNavigation(props: PropsWithChildren<VeilederVerktoyNavigationProps>) {
    const renderLocation = () => {
        switch (props.navigation.location) {
            case 'start_eskalering':
                return <StartEskalering />;
            case 'vis_arbeidsliste':
                return <ArbeidslisteController />;
            case 'tildel_veileder':
                return <TildelVeileder />;
            case 'tildel_veileder_feilet':
                return <FeilTildelingModal />;
            case 'tildel_veileder_kvittering':
                return <TildelVeilederKvittering />;
            case 'start_eskalering_kvittering':
                return <StartEskaleringKvittering />;
            case 'manuell_oppfolging':
                return <StarManuellOppfolging />;
            case 'sett_manuell_kvittering':
                return <StartManuellOppfolgingKvittering begrunnelse={props.navigation.begrunnelse} />;
            case 'start_digital_oppfolging':
                return <StartDigitalOppfolging />;
            case 'start_digital_oppfoling_kvitterig':
                return <StartDigitalOppfolgingKvittering begrunnelse={props.navigation.begrunnelse} />;
            case 'start_kvp_periode':
                return <StarKvpPeriode />;
            case 'start_kvp_periode_kvittering':
                return <StartKVPKvittering />;
            case 'stopp_kvp_periode':
                return <StoppKvpPeriode />;
            case 'stopp_kvp_periode_kvittering':
                return <StoppKVPKvittering />;
            case 'opprett_oppgave':
                return <OpprettOppgave />;
            case 'oppgave_kvittering':
                return <OpprettOppgaveKvittering />;
            case 'avslutt_oppfolging':
                return <AvsluttOppfolging />;
            case 'avlutt_oppfolging_bekreft':
                return <AvsluttOppfolgingBekreft />;
            case 'avslutt_oppfolging_kvittering':
                return <AvsluttOppfolgingKvittering />;
            case 'stopp_eskalering':
                return <StoppEskalering />;
            case 'stopp_eskalering_kvittering':
                return <StopEskaleringKvittering />;
            case 'vis_historikk':
                return <Historikk />;
            case 'feil_i_veilederverktoy':
                return <FeilModal />;
            case 'pending':
                return <LasterModal />;
            default:
                return null;
        }
    };

    return (
        <div className="visittkortfs__container">
            {props.children}
            {renderLocation()}
        </div>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navigation: state.ui.navigation
});

export default connect<StateProps>(mapStateToProps)(hiddenIf(VeilederVerktoyNavigation));
