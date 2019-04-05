import React from 'react';
import './toast.less';
import { Dispatch } from 'redux';
import { slettArbeidsliste } from '../../../store/arbeidsliste/actions';
import { connect } from 'react-redux';
import { fjernToast } from '../../../store/toast/actions';

export interface ToastType {
    tekst: string;
    timestamp: number;
    className?: string;
}

interface DispatchProps {
    doSlettArbeidsliste: () => void;
    doFjernToast: (toast: ToastType) => void;
}

type ToastProps = {toast: ToastType} & DispatchProps;

function Toast (props: ToastProps) {

    const handleClick = () => {
        clearInterval(interval);
        props.doFjernToast(props.toast);
    };

    const timeoutFunc = () => {
        props.doSlettArbeidsliste();
        props.doFjernToast(props.toast);
    };

    const interval: number = window.setTimeout(timeoutFunc, 100000);

    return (
        <div className="toast-wrapper">
            <span className="toast">
                <span>Arbeidslisten har blitt slettet.</span>
                <span className="toast__lenke" onClick={handleClick}>Ångre</span>
                <span onClick={timeoutFunc} className="toast__close">&times;</span>
            </span>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doSlettArbeidsliste : () => dispatch(slettArbeidsliste()),
    doFjernToast : (toast: ToastType) => dispatch(fjernToast(toast))
});

export default connect<{}, DispatchProps, ToastType>(null, mapDispatchToProps)(Toast);