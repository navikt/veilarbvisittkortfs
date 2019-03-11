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
import { OrNothing } from '../../../../types/utils/ornothing';

interface OwnProps {
    tittelId: string;
    alertStripeTekstId: string;
    alertStripeTekstValues: OrNothing<{ [key: string]: any}>;
}

interface StateProps {
    navn: string;
}

interface DispatchProps {
    navigerTilbake: () => void;
}

type KvitteringProps = StateProps & DispatchProps & OwnProps;

function Kvittering({navn, navigerTilbake, tittelId, alertStripeTekstId, alertStripeTekstValues}: KvitteringProps) {
    return (
        <Modal
            onRequestClose={navigerTilbake}
            contentLabel="veilederverktoy-modal"
            isOpen={true}
            className=""
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
                        <FormattedMessage id={tittelId} />
                    </Systemtittel>
                </div>
                <AlertStripeSuksess className="blokk-m">
                    <FormattedMessage
                        id={alertStripeTekstId}
                        values={alertStripeTekstValues ? alertStripeTekstValues : {}}
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

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Kvittering);