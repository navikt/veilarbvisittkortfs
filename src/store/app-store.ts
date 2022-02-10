import constate from 'constate';
import { useState } from 'react';

export interface AppStoreInitialValues {
	brukerFnr: string;
	enhetId?: string;
	tilbakeTilFlate: string;
	visVeilederVerktoy: boolean;
}

export const [AppStore, useAppStore] = constate((initalValues: AppStoreInitialValues) => {
	const [brukerFnr, setBrukerFnr] = useState<string>(initalValues.brukerFnr);
	const [enhetId, setEnhetId] = useState<string | undefined>(initalValues.enhetId);
	const [tilbakeTilFlate, setTilbakeTilFlate] = useState<string>(initalValues.tilbakeTilFlate);
	const [visVeilederVerktoy, setVisVeilederVerktoy] = useState<boolean>(initalValues.visVeilederVerktoy);

	return {
		brukerFnr,
		setBrukerFnr,
		enhetId,
		setEnhetId,
		tilbakeTilFlate,
		setTilbakeTilFlate,
		visVeilederVerktoy,
		setVisVeilederVerktoy
	};
});
