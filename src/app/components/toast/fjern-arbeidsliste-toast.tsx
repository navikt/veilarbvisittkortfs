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
    const toastRef = useRef<HTMLSpanElement>(null);
    const startTimeMS = new Date().getTime();

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, []);

    const logTidIgjen = () => {
        logEvent (
            'veilarbvisittkortfs.metrikker.fjern-toast-arbeidsliste-trykket',
            {tidIgjen: (new Date().getTime() - startTimeMS) / 1000},
            {}
        );
    };

    const handleClick = () => {
        clearInterval(interval);
        logEvent('veilarbvisittkortfs.metrikker.angre-arbeidsliste-trykket');
        props.doFjernToast(props.toast);
    };

    const timeoutFunc = () => {
        logTidIgjen();
        clearInterval(interval);
        props.doSlettArbeidsliste();
        props.doFjernToast(props.toast);
    };

    const interval: number = window.setTimeout(timeoutFunc, 15000);

    return (
        <div className="toast-wrapper" key={new Date().getTime()}>
            <span ref={toastRef}  tabIndex={0} className="toast">
                <span>Brukeren er fjernet fra arbeidslisten.</span>
                <button
                    className="toast--button"
                    onClick={handleClick}
                    aria-describedby="Knapp for angre sletting"
                >
                    Angre
                </button>
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