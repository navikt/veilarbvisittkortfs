import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Modal from '../../../components/modal/modal';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';
import {Appstate} from "../../../../types/appstate";
import {OrNothing} from "../../../../types/utils/ornothing";
import {OppgaveTema, OppgaveType} from "../../../../types/oppgave";
import PersonaliaSelector from "../../../../store/personalia/selectors";

interface StateProps {
    tema: OrNothing<OppgaveTema>;
    type: OrNothing<OppgaveType>;
    navn: string;
}

interface DispatchProps {
    navigerTilbake: () => void;
}

type StartOppfolgingKvittering = StateProps & DispatchProps;

function OpprettOppgaveKvittering({tema, type, navigerTilbake}: StartOppfolgingKvittering) {
    return (
        <Modal
            onRequestClose={navigerTilbake}
            className="veilederverktoy-modal"
            contentLabel="veilederverktoy-modal"
        >
            <article className="innstillinger__container">
                <Innholdstittel>
                    <FormattedMessage
                        id="innstillinger.modal.overskrift"
                        values={{  }}
                    />
                </Innholdstittel>
                <div className="innstillinger__innhold blokk-xs">
                    <Systemtittel>
                        <FormattedMessage id="innstillinger.modal.start-kvp.tittel" />
                    </Systemtittel>
                </div>
                <AlertStripeSuksess className="blokk-m">
                    <FormattedMessage
                        id="innstillinger.modal.oppgave-kvittering"
                        values={{ tema, type }}
                    />
                </AlertStripeSuksess>
            </article>
        </Modal>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navn: PersonaliaSelector.selectSammensattNavn(state),
    tema: state.oppgavehistorikk.data.lagetOppgave && state.oppgavehistorikk.data.lagetOppgave.tema ,
    type: state.oppgavehistorikk.data.lagetOppgave && state.oppgavehistorikk.data.lagetOppgave.type
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilbake: () => dispatch(navigerAction(null))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(OpprettOppgaveKvittering);