import React, {useEffect, useRef} from 'react';
import './toast.less';
import AlertStripeSuksess from "nav-frontend-alertstriper/lib/suksess-alertstripe";
import {logEvent} from "../../utils/frontend-logger";
import useTimer from "../../../hooks/use-timer";
import {useDispatch, useSelector} from 'react-redux';
import {fjernTildeltVeilederToast} from "../../../store/toast/actions";
import {Appstate} from "../../../types/appstate";

export interface ToastType {
    tekst: string;
    timestamp: number;
    className?: string;
}

interface DispatchProps {
    doFjernToast: (toast: ToastType) => void;
}

type ToastProps = { toast: ToastType } & DispatchProps;


function FjernTildelVeilederToast(props: ToastProps) {
    const toastRef = useRef<HTMLSpanElement>(null);
    const {startTimer, stoppTimer} = useTimer();
    const dispatch = useDispatch();

    const tingFraRedux = useSelector((state: Appstate) => ({
        veilederPaEnheten: state.tildelVeileder.veilederPaEnheten.data.veilederListe,
        tildeltVeileder: state.tildelVeileder.tildeltVeileder.data

    }));

    const veilederObjekt = tingFraRedux.tildeltVeileder && tingFraRedux.tildeltVeileder.tilVeilederId
        ? tingFraRedux.veilederPaEnheten.find(v => v.ident === tingFraRedux.tildeltVeileder!.tilVeilederId)
        : null;
    const veiledernavn = veilederObjekt ? `${veilederObjekt.etternavn}, ${veilederObjekt!.fornavn}` : "";

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClick();
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        startTimer();
    });

    const handleClick = () => {
        const tidBrukt = stoppTimer();
        logEvent('veilarbvisittkortfs.metrikker.lukk-toast-tildel-veileder', {
                feature: 'toast-tildel-veileder',
                tidBrukt,
            }
        );
        dispatch(fjernTildeltVeilederToast());
    };

    return (
        <div className="toast-wrapper" key={new Date().getTime()}>
            <AlertStripeSuksess className="toast-alertstripe">
                <span ref={toastRef} tabIndex={0} className="toast">
                    Du har tildelt veileder {veiledernavn}. Det kan ta noe tid før brukeren er i Min oversikt.
                    <button onClick={handleClick} className="lukknapp lukknapp--svart">&times;</button>
                </span>
            </AlertStripeSuksess>
        </div>
    );
}

export default FjernTildelVeilederToast;
