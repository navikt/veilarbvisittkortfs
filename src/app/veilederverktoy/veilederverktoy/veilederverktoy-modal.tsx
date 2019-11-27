import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Appstate } from '../../../types/appstate';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../store/navigation/actions';
import NavFrontendModal from 'nav-frontend-modal';
import classNames from 'classnames';
import ModalHeader from '../../components/modal/modal-header';
import PersonaliaSelector from '../../../store/personalia/selectors';

const cls = (className?: string) => classNames('modal', className);

interface OwnProps {
    children: React.ReactNode;
    visConfirmDialog?: boolean;
    touched?: boolean;
    className?: string;
    tilbakeTekstId?: string;
    tilbakeFunksjon?: () => void;
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
            className={cls(props.className)}
            contentLabel="veilederverktoy"
            isOpen={true}
            onRequestClose={props.tilbake}
            closeButton={true}
            portalClassName="visittkortfs-modal"
        >
            <ModalHeader tilbakeTekstId={props.tilbakeTekstId} tilbake={props.tilbakeFunksjon} />
            <div className="modal-innhold">
                <div className="modal-info-tekst">
                    <Innholdstittel className="modal-info-tekst__overskrift">
                        <FormattedMessage id="innstillinger.modal.overskrift" values={{ navn: props.navnPaMotpart }} />
                    </Innholdstittel>
                </div>
                {props.children}
            </div>
        </NavFrontendModal>
    );
}

const mapStateToProps = (state: Appstate) => ({
    navnPaMotpart: PersonaliaSelector.selectSammensattNavn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    tilbake: () => dispatch(navigerAction(null))
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(VeilederVerktoyModal));
