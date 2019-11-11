import React from 'react';
import {Appstate} from '../../../types/appstate';
import {connect} from 'react-redux';
import {ToastActionType} from '../../../store/toast/actions';
import hiddenIf from '../hidden-if/hidden-if';
import FjernTildelVeilederToast from "./fjern-tildel-veileder-toast";
// import {logEvent} from "../../utils/frontend-logger";
// import stoppTimer from '../../../hooks/use-timer';
// import startTimer from '../../../hooks/use-timer';

interface StateProps {
    toasts: ToastActionType[];
}

// const onClose = () => {
//     const tidBrukt = stoppTimer();
//     logEvent('veilarbvisittkortfs.metrikker.lukk-toast-tildel-veileder', {
//             feature: 'toast-tildel-veileder',
//             tidBrukt,
//         }
//     )
// };

// const onOpen = () => {
//     startTimer();
// }

function Toasts({toasts}: StateProps) {
    return (
        <>
            {toasts.map((toast, index) => {
                switch (toast) {
                    case ToastActionType.VIS_TILDELT_VEILEDER_TOAST:
                        // @ts-ignore
                        return <FjernTildelVeilederToast key={index}
                                                         // onOpen={onOpen()}
                                                         // onClose={onClose()}
                        />;
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
