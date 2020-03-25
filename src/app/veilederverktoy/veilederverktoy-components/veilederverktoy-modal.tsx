import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../store/navigation/actions';
import ModalHeader from '../../components/modal/modal-header';
import Modal from '../../components/modal/modal';

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
        <Modal
            className={props.className}
            isOpen={true}
            onRequestClose={props.lukkModal}
            contentLabel="veilederverktoy"
        >
            <ModalHeader />
            <div className="modal-innhold">{props.children}</div>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    lukkModal: () => dispatch(navigerAction(null))
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(injectIntl(VeilederVerktoyModal));