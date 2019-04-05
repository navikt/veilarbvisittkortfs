import React from 'react';
import { Appstate } from '../../../types/appstate';
import { connect } from 'react-redux';
import Toast, { ToastType } from './toast';

interface StateProps {
    toasts: ToastType[];
}

function Toasts({toasts}: StateProps) {
    return (
        <>
           {toasts.map((toast, index) => <Toast key={index} toast={toast}/>)}
        </>
    );

}

const mapStateToProps = (state: Appstate): StateProps => ({
    toasts: state.ui.toasts.toasts
});
/*
const mapDispatchToProps = (dispatch: Dispatch) => ({

});
*/

export default connect<StateProps>(mapStateToProps)(Toasts);