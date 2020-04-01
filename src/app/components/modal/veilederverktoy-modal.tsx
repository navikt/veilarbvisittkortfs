import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../store/navigation/actions';
import Modal from './modal';
import ModalHeader from './modal-header';
import classNames from 'classnames';

interface OwnProps {
    children: React.ReactNode;
    visConfirmDialog?: boolean;
    touched?: boolean;
    className?: string;
    tilbakeTekst?: string;
    tilbakeFunksjon?: () => void;
    tittel?: string;
}

interface DispatchProps {
    lukkModal: () => void;
}

type VeilederVerktoyModalProps = OwnProps & DispatchProps & InjectedIntlProps;

function VeilederVerktoyModal(props: VeilederVerktoyModalProps) {
    return (
        <Modal
            className={classNames('veilederverktoy-modal', props.className)}
            isOpen={true}
            onRequestClose={props.lukkModal}
            contentLabel="veilederverktoy"
        >
            <ModalHeader tittel={props.tittel} />
            <div className="modal-innhold">{props.children}</div>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    lukkModal: () => dispatch(navigerAction(null)),
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(injectIntl(VeilederVerktoyModal));
