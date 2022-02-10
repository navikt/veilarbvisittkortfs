import React from 'react';
import AlertStripeFeil from 'nav-frontend-alertstriper';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';

export function FeilModal() {
	return (
		<VeilederVerktoyModal tittel="Noe gikk galt">
			<AlertStripeFeil className="blokk-m" type="feil">
				Vi beklager, men det ser ut som noe gikk galt. Systemet er nede. Prøv igjen senere.
			</AlertStripeFeil>
		</VeilederVerktoyModal>
	);
}
