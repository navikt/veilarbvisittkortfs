import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import {Appstate} from "../../../types/appstate";
import Modal from '../../components/modal/modal';
import ModalHeader from '../../components/modal/modal-header';
import injectIntl = ReactIntl.injectIntl;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {Dispatch} from "redux";
import {navigerTilbake} from "../../../store/navigation/actions";


interface OwnProps {
    children: React.ReactNode;
    ingenTilbakeKnapp?: boolean,
    visConfirmDialog?: boolean,
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

    const onRequestClose= () => {
        const dialogTekst = props.intl.formatMessage({id: 'aktkivitet-skjema.lukk-advarsel'});
        if (!props.touched || confirm(dialogTekst)) {
            props.tilbake();
        }
    };

    return (
        <Modal
            header={
                <ModalHeader
                    visConfirmDialog={props.visConfirmDialog}
                    tilbakeTekstId={props.ingenTilbakeKnapp
                        ? null
                        : 'innstillinger.modal.tilbake'
                    }
                />
            }
            contentLabel="instillinger-modal"
            contentClass="innstillinger"
            onRequestClose={onRequestClose}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    tilbake: ()=> dispatch(navigerTilbake())
});

export default connect<StateProps,DispatchProps,OwnProps>(mapStateToProps, mapDispatchToProps)(injectIntl(VeilederVerktoyModal));