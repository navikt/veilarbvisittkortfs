import React, { useEffect } from 'react';
import AlertStripeSuksess from 'nav-frontend-alertstriper/lib/suksess-alertstripe';
import { useFocus } from '../../../util/hook/use-focus';
import useTimer from '../../../util/hook/use-timer';
import { logger } from '../../../util/logger';
import { useToastStore } from '../../../store/toast-store';
import './toast.less';

export interface FjernTildelVeilederToastProps {
	tildeltVeilederNavn: string;
}

function FjernTildelVeilederToast(props: FjernTildelVeilederToastProps) {
	const { hideToast } = useToastStore();

	const { focusRef } = useFocus();
	const { startTimer, stoppTimer } = useTimer();

	const handleClick = () => {
		const tidBrukt = stoppTimer();
		logger.event('veilarbvisittkortfs.metrikker.lukk-toast-tildel-veileder', {
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
			<AlertStripeSuksess className="toast-alertstripe">
				<span ref={focusRef} tabIndex={0} className="toast">
					Du har tildelt veileder {props.tildeltVeilederNavn}. Det kan ta noe tid før brukeren er i Min
					oversikt.
					<button onClick={handleClick} className="lukknapp lukknapp--svart" />
				</span>
			</AlertStripeSuksess>
		</div>
	);
}

export default FjernTildelVeilederToast;
