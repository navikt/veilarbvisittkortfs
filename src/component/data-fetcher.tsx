import React, { useEffect } from 'react';
import { useDataStore } from '../store/data-store';
import { fetchFeaturesToggles, HENT_PERSONDATA_FRA_PDL_TOGGLE } from '../api/veilarbpersonflatefs';
import { useAppStore } from '../store/app-store';
import { fetchOppfolging, fetchOppfolgingsstatus, fetchTilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { fetchPersonalia, fetchSpraakTolk, fetchVergeOgFullmakt } from '../api/veilarbperson';
import { fetchInnloggetVeileder, fetchVeilederePaEnhet } from '../api/veilarbveileder';
import { fetchArbeidsliste } from '../api/veilarbportefolje';
import { ifResponseHasData } from '../util/utils';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';
import './data-fetcher.less';
import { isAnyLoadingOrNotStarted } from '../api/utils';
import NavFrontendSpinner from 'nav-frontend-spinner';

export function DataFetcher(props: { children: any }) {
	const { brukerFnr } = useAppStore();
	const {
		setOppfolgingsstatus,
		setOppfolging,
		setInnloggetVeileder,
		setPersonalia,
		setTilgangTilBrukersKontor,
		setArbeidsliste,
		setVeilederePaEnhet,
		setFeatures,
		setVergeOgFullmakt,
		setSpraakTolk,
		features
	} = useDataStore();

	const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
	const oppfolgingstatusFetcher = useAxiosFetcher(fetchOppfolgingsstatus);
	const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
	const featureToggleFetcher = useAxiosFetcher(fetchFeaturesToggles);
	const personaliaFetcher = useAxiosFetcher(fetchPersonalia);
	const tilgangTilBrukersKontorFetcher = useAxiosFetcher(fetchTilgangTilBrukersKontor);
	const arbeidslisteFetcher = useAxiosFetcher(fetchArbeidsliste);
	const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);
	const vergeOgFullmaktFetcher = useAxiosFetcher(fetchVergeOgFullmakt);
	const spraakTolkFetcher = useAxiosFetcher(fetchSpraakTolk);

	const hentPersonDataFraPdl = features[HENT_PERSONDATA_FRA_PDL_TOGGLE];
	const oppfolgingsEnhet = oppfolgingstatusFetcher.data?.oppfolgingsenhet.enhetId || '';

	useEffect(() => {
		oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging)).catch();
		oppfolgingstatusFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolgingsstatus)).catch();
		tilgangTilBrukersKontorFetcher.fetch(brukerFnr).then(ifResponseHasData(setTilgangTilBrukersKontor)).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brukerFnr]);

	useEffect(() => {
		if (hentPersonDataFraPdl) {
			vergeOgFullmaktFetcher.fetch(brukerFnr).then(ifResponseHasData(setVergeOgFullmakt)).catch();
			spraakTolkFetcher.fetch(brukerFnr).then(ifResponseHasData(setSpraakTolk)).catch();
		}

		personaliaFetcher.fetch(brukerFnr, hentPersonDataFraPdl).then(ifResponseHasData(setPersonalia)).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brukerFnr, features]);

	useEffect(() => {
		innloggetVeilederFetcher.fetch().then(ifResponseHasData(setInnloggetVeileder)).catch();
		featureToggleFetcher.fetch().then(ifResponseHasData(setFeatures)).catch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const harTilgang = tilgangTilBrukersKontorFetcher.data?.tilgangTilBrukersKontor;
		const underOppfolging = oppfolgingFetcher.data?.underOppfolging;

		if (harTilgang && underOppfolging) {
			arbeidslisteFetcher.fetch(brukerFnr).then(ifResponseHasData(setArbeidsliste)).catch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tilgangTilBrukersKontorFetcher, oppfolgingFetcher.data]);

	useEffect(() => {
		if (oppfolgingsEnhet) {
			veilederePaEnhetFetcher.fetch(oppfolgingsEnhet).then(ifResponseHasData(setVeilederePaEnhet)).catch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [oppfolgingstatusFetcher]);

	if (
		isAnyLoadingOrNotStarted(
			oppfolgingstatusFetcher,
			oppfolgingFetcher,
			innloggetVeilederFetcher,
			personaliaFetcher,
			featureToggleFetcher,
			tilgangTilBrukersKontorFetcher
			// trenger ikke vente på vergeOgFullmaktFetcher eller spraakTolkFetcher
		)
	) {
		return <NavFrontendSpinner className="visittkort-laster" type="L" />;
	}

	return <>{props.children}</>;
}
