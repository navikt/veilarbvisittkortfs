import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../store/navigation/actions';
import NavFrontendModal from 'nav-frontend-modal';
import classNames from 'classnames';
import ModalHeader from '../../components/modal/modal-header';

const cls = (className?: string) => classNames('modal', className);

interface OwnProps {
    children: React.ReactNode;
    visConfirmDialog?: boolean;
    touched?: boolean;
    className?: string;
    tilbakeTekstId?: string;
    tilbakeFunksjon?: () => void;
}

interface DispatchProps {
    lukkModal: () => void;
}

type VeilederVerktoyModalProps = OwnProps & DispatchProps & InjectedIntlProps;

function VeilederVerktoyModal(props: VeilederVerktoyModalProps) {
    return (
        <NavFrontendModal
            className={cls(props.className)}
            contentLabel="veilederverktoy"
            isOpen={true}
            onRequestClose={props.lukkModal}
            closeButton={true}
            portalClassName="visittkortfs-modal"
        >
            <ModalHeader />
            <div className="modal-innhold">{props.children}</div>
        </NavFrontendModal>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    lukkModal: () => dispatch(navigerAction(null))
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(injectIntl(VeilederVerktoyModal));
