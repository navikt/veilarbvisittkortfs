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
import ModalHeader from "../../../components/modal/modal-header";

interface StateProps {
    navn: string;
}

interface DispatchProps {
    navigerTilbake: () => void;
}

type StartOppfolgingKvittering = StateProps & DispatchProps;

function StartKVPKvittering({navn, navigerTilbake}: StartOppfolgingKvittering) {
    return (
        <Modal
            onRequestClose={navigerTilbake}
            className="veilederverktoy-modal"
            contentLabel="veilederverktoy-modal"
        >
            <ModalHeader/>
            <article className="prosess">
                <Innholdstittel>
                    <FormattedMessage
                        id="innstillinger.modal.overskrift"
                        values={{ navn }}
                    />
                </Innholdstittel>
                <div className="innstillinger__innhold blokk-xs">
                    <Systemtittel>
                        <FormattedMessage id="innstillinger.prosess.start-kvp.tittel" />
                    </Systemtittel>
                </div>
                <AlertStripeSuksess className="blokk-m">
                    <FormattedMessage
                        id="innstillinger.modal.start-kvp.kvittering.ok"
                        values={{ navn }}
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

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StartKVPKvittering);