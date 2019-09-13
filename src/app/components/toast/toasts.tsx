import React from 'react';
import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import FjernArbeidslisteToast from './fjern-arbeidsliste-toast';
import { ToastActionType } from '../../../store/toast/actions';
import hiddenIf from '../hidden-if/hidden-if';

interface StateProps {
    toasts: ToastActionType[];
}

function Toasts({toasts}: StateProps) {
    return (
        <>
            {toasts.map((toast, index) => {
                switch (toast) {
                    case ToastActionType.VIS_ARBEIDSLISTE_TOAST:
                        // @ts-ignore
                        return <FjernArbeidslisteToast key={index}/>;
                    default:
                        return null;
                }
            })}
        </>
    );

}

const mapStateToProps = (state: Appstate): StateProps => ({
    toasts: state.ui.toasts.toasts
});

export default connect<StateProps>(mapStateToProps)(hiddenIf(Toasts));