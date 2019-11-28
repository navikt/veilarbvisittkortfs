import React from 'react';
import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import { ToastActionType } from '../../../store/toast/actions';
import hiddenIf from '../hidden-if/hidden-if';
import FjernTildelVeilederToast from './fjern-tildel-veileder-toast';

interface StateProps {
    toasts: ToastActionType[];
}

function Toasts({ toasts }: StateProps) {
    return (
        <>
            {toasts.map((toast, index) => {
                switch (toast) {
                    case ToastActionType.VIS_TILDELT_VEILEDER_TOAST:
                        // @ts-ignore
                        return <FjernTildelVeilederToast key={index} />;
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
