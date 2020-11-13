import React, { useEffect } from 'react';
import './toast.less';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { logEvent } from '../../utils/frontend-logger';
import { useDispatch, useSelector } from 'react-redux';
import { fjernTildeltVeilederToast } from '../../../store/toast/actions';
import VeilederSelector from '../../../store/tildel-veileder/selector';
import { useFocus } from '../../../util/hook/use-focus';
import useTimer from '../../../util/hook/use-timer';

export interface ToastType {
    tekst: string;
    timestamp: number;
    className?: string;
}

function FjernTildelVeilederToast() {
    const { focusRef } = useFocus();
    const { startTimer, stoppTimer } = useTimer();
    const dispatch = useDispatch();
    const veiledernavn = ' ' + useSelector(VeilederSelector.selectTildeltVeiledernavn);

    const handleClick = () => {
        const tidBrukt = stoppTimer();
        logEvent('veilarbvisittkortfs.metrikker.lukk-toast-tildel-veileder', {
            feature: 'toast-tildel-veileder',
            tidBrukt,
        });
        dispatch(fjernTildeltVeilederToast());
    };

    useEffect(() => {
        const timer = setTimeout(() => handleClick(), 100000000);
        return () => clearTimeout(timer);
    });

    startTimer();

    return (
        <div className="toast-wrapper" key={new Date().getTime()}>
            <AlertStripeSuksess className="toast-alertstripe">
                <span ref={focusRef} tabIndex={0} className="toast">
                    Du har tildelt veileder{veiledernavn}. Det kan ta noe tid før brukeren er i Min oversikt.
                    <button onClick={handleClick} className="lukknapp lukknapp--svart">
                        &times;
                    </button>
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default FjernTildelVeilederToast;
