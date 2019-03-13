import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Modal from '../../../components/modal/modal';
import { Appstate } from '../../../../types/appstate';
import PersonaliaSelectors from '../../../../store/personalia/selectors';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';

interface OwnProps {
    begrunnelse?: string;
}

interface StateProps {
    navn: string;
}

interface DispatchProps {
    navigerTilbake: () => void;
}

type StartOppfolgingKvittering = StateProps & DispatchProps & OwnProps;

function StartDigitalOppfolgingKvittering({navn, navigerTilbake, begrunnelse}: StartOppfolgingKvittering) {
    return (
        <Modal
            onRequestClose={navigerTilbake}
            contentLabel="veilederverktoy-modal"
            className="veilederverktoy-modal"
        >
            <article className="innstillinger__container">
                <Innholdstittel>
                    <FormattedMessage
                        id="innstillinger.modal.overskrift"
                        values={{ navn }}
                    />
                </Innholdstittel>
                <div className="innstillinger__innhold blokk-xs">
                    <Systemtittel>
                        <FormattedMessage id="innstillinger.prosess.digital.tittel" />
                    </Systemtittel>
                </div>
                <AlertStripeSuksess className="blokk-m">
                    <FormattedMessage
                        id="innstillinger.prosess.digital.kvittering"
                        values={{begrunnelse}}
                    />
                </AlertStripeSuksess>
            </article>
        </Modal>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navn: PersonaliaSelectors.selectSammensattNavn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilbake: () => dispatch(navigerAction(null))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StartDigitalOppfolgingKvittering);