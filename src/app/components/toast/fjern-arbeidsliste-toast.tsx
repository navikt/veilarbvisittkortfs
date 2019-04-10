import React, { useEffect, useRef } from 'react';
import './toast.less';
import { Dispatch } from 'redux';
import { slettArbeidsliste } from '../../../store/arbeidsliste/actions';
import { connect } from 'react-redux';
import { fjernArbeidslisteToast } from '../../../store/toast/actions';
import { logEvent } from '../../utils/frontend-logger';

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

function FjernArbeidslisteToast (props: ToastProps) {
    const angreRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        (angreRef.current as HTMLSpanElement).focus();
    }, []);

    const handleClick = () => {
        clearInterval(interval);
        logEvent('veilarbvisittkortfs.metrikker.angre-arbeidsliste-trykket');
        props.doFjernToast(props.toast);
    };

    const timeoutFunc = () => {
        props.doSlettArbeidsliste();
        props.doFjernToast(props.toast);
    };

    const interval: number = window.setTimeout(timeoutFunc, 20000);

    return (
        <div className="toast-wrapper">
            <span className="toast">
                <span>Brukeren er fjernet fra arbeidslisten.</span>
                <span
                    ref={angreRef}
                    className="toast__lenke"
                    onClick={handleClick}
                    role="link"
                    aria-label="Lenke til angre"
                    tabIndex={0}
                >
                    Angre
                </span>
                <button onClick={timeoutFunc} className="lukknapp lukknapp--hvit">&times;</button>
            </span>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    doSlettArbeidsliste : () => dispatch(slettArbeidsliste()),
    doFjernToast : () => dispatch(fjernArbeidslisteToast())
});

export default connect<{}, DispatchProps, ToastType>(null, mapDispatchToProps)(FjernArbeidslisteToast);