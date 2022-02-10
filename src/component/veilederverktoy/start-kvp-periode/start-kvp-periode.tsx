import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { Normaltekst } from 'nav-frontend-typografi';
import { useModalStore } from '../../../store/modal-store';
import { useAppStore } from '../../../store/app-store';
import { fetchOppfolging, startKvpOppfolging } from '../../../api/veilarboppfolging';
import { ifResponseHasData } from '../../../util/utils';
import { useDataStore } from '../../../store/data-store';

function StarKvpPeriode() {
	const { brukerFnr } = useAppStore();
	const { setOppfolging } = useDataStore();
	const { showStartKvpPeriodeKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

	function startKvp({ begrunnelse }: BegrunnelseValues) {
		showSpinnerModal();
		startKvpOppfolging(brukerFnr, begrunnelse)
			.then(() => {
				fetchOppfolging(brukerFnr)
					.then(ifResponseHasData(setOppfolging))
					.then(showStartKvpPeriodeKvitteringModal)
					.catch(showErrorModal);
			})
			.catch(showErrorModal);
	}

	const infoTekst = (
		<Normaltekst className="blokk-xs">
			Når du klikker «Bekreft» vil bare veiledere i din enhet ha tilgang på dialoger, aktiviteter og mål som blir
			opprettet i KVP-perioden. Du må skrive en kommentar før du bekrefter.
		</Normaltekst>
	);

	const initialValues = { begrunnelse: '' };

	return (
		<BegrunnelseForm
			initialValues={initialValues}
			handleSubmit={startKvp}
			tekstariaLabel="Begrunnelse:"
			tittel="Start periode i Kvalifiseringsprogrammet (KVP)"
			infoTekst={infoTekst}
			isLoading={false}
			maxLength={250}
		/>
	);
}

export default StarKvpPeriode;
