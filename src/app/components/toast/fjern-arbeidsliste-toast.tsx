import React, { useEffect, useRef } from 'react';
import './toast.less';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {fjernTildeltVeilederToast} from "../../../store/toast/actions";

export interface ToastType {
    tekst: string;
    timestamp: number;
    className?: string;
}

interface DispatchProps {
    doFjernToast: (toast: ToastType) => void;
}

type ToastProps = {toast: ToastType} & DispatchProps;

function FjernTildelVeilederToast (props: ToastProps) {
    const toastRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    const handleClick = () => {
        props.doFjernToast(props.toast);
    };

    return (
        <div className="toast-wrapper" key={new Date().getTime()}>
            <span ref={toastRef}  tabIndex={0} className="toast">
                <span>Du har tildelt veileder. Det kan ta noe tid før brukeren er i Min oversikt.</span>
                <button onClick={handleClick} className="lukknapp lukknapp--hvit">&times;</button>
            </span>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doFjernToast : () => dispatch(fjernTildeltVeilederToast())
});

export default connect<{}, DispatchProps, ToastType>(null, mapDispatchToProps)(FjernTildelVeilederToast);
