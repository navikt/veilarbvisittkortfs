import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import {Appstate} from "../../../types/appstate";
import Modal from '../../components/modal/modal';
import ModalHeader from '../../components/modal/modal-header';


interface OwnProps {
    children: React.ReactNode;
    onRequestClose?: () => void,
    ingenTilbakeKnapp?: boolean,
    visConfirmDialog?: boolean,
}
interface StateProps {
    navnPaMotpart: string;
}


type VeilederVerktoyModalProps = OwnProps & StateProps;

function VeilederVerktoyModal(props: VeilederVerktoyModalProps) {
    return (
        <Modal
            header={
                <ModalHeader
                    visConfirmDialog={props.visConfirmDialog}
                    tilbakeTekstId={
                        props.ingenTilbakeKnapp
                            ? null
                            : 'innstillinger.modal.tilbake'
                    }
                />
            }
            contentLabel="instillinger-modal"
            contentClass="innstillinger"
            onRequestClose={props.onRequestClose}
            className=""
            isOpen={true}
        >
            <article className="innstillinger__container">
                    <Innholdstittel className="innstillinger__overskrift">
                        <FormattedMessage
                            id="innstillinger.modal.overskrift"
                            values={{ navn: props.navnPaMotpart }}
                        />
                    </Innholdstittel>
                <div className="innstillinger__innhold"
                >
                    {props.children}
                </div>
            </article>
        </Modal>
    );
}



const mapStateToProps = (state: Appstate) => ({
    navnPaMotpart: state.personalia.data.sammensattNavn,
});

export default connect<StateProps,{},OwnProps>(mapStateToProps)(VeilederVerktoyModal);