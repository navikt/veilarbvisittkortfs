import React, { useEffect } from 'react';
import { useFocus } from '../../../util/hook/use-focus';
import useTimer from '../../../util/hook/use-timer';
import { useToastStore } from '../../../store/toast-store';
import './toast.less';
import { logMetrikk } from '../../../util/logger';
import {Alert} from "@navikt/ds-react";

export interface FjernTildelVeilederToastProps {
    tildeltVeilederNavn: string;
}

function FjernTildelVeilederToast(props: FjernTildelVeilederToastProps) {
    const { hideToast } = useToastStore();

    const { focusRef } = useFocus();
    const { startTimer, stoppTimer } = useTimer();

    const handleClick = () => {
        const tidBrukt = stoppTimer();
        logMetrikk('veilarbvisittkortfs.metrikker.lukk-toast-tildel-veileder', {
            feature: 'toast-tildel-veileder',
            tidBrukt
        });

        hideToast();
    };

    useEffect(() => {
        const timer = setTimeout(() => handleClick(), 100000000);
        return () => clearTimeout(timer);
    });

    startTimer();

    return (
        <div className="toast-wrapper" key={new Date().getTime()}>
            <Alert variant="success" className="toast-alertstripe">
                <span ref={focusRef} tabIndex={0} className="toast">
                    Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min
                    oversikt.
                    <button onClick={handleClick} className="lukknapp lukknapp--svart" />
                </span>
            </Alert>
        </div>
    );
}

export default FjernTildelVeilederToast;
