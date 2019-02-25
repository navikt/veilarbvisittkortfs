import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import {Innholdstittel} from 'nav-frontend-typografi';
import { Appstate } from '../../../types/appstate';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../store/navigation/actions';
import NavFrontendModal from "nav-frontend-modal";

interface OwnProps {
    children: React.ReactNode;
    ingenTilbakeKnapp?: boolean;
    visConfirmDialog?: boolean;
    touched: boolean;
}
interface StateProps {
    navnPaMotpart: string;
}

interface DispatchProps {
    tilbake: () => void;
}

type VeilederVerktoyModalProps = OwnProps & StateProps & DispatchProps & InjectedIntlProps;

function VeilederVerktoyModal(props: VeilederVerktoyModalProps) {
    return (
        <NavFrontendModal
            className="arbeidsliste-modal"
            contentLabel="arbeidsliste"
            isOpen={true}
            onRequestClose={props.tilbake}
            closeButton
        >
            <div className="modal-header-wrapper">
                <header className="modal-header"/>
            </div>
            <div className="arbeidsliste__modal">
                <div className="arbeidsliste-info-tekst">
                    <Innholdstittel className="arbeidsliste__overskrift">
                        <FormattedMessage
                            id="innstillinger.modal.overskrift"
                            values={{ navn: props.navnPaMotpart }}
                        />
                    </Innholdstittel>
                </div>
                {props.children}
            </div>
        </NavFrontendModal>
    );
}

const mapStateToProps = (state: Appstate) => ({
    navnPaMotpart: state.personalia.data.sammensattNavn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    tilbake: () => dispatch(navigerAction(null))
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(injectIntl(VeilederVerktoyModal));