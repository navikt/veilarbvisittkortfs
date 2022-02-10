import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { HiddenIfFlatKnapp } from '../components/hidden-if/hidden-if-knapp';
import { ReactComponent as SlettIcon } from '../components/ikoner/slett.svg';
import React from 'react';

interface ArbeidslisteFooterProps {
	onRequestClose: () => void;
	slettArbeidsliste: () => void;
	kanFjerneArbeidsliste: boolean;
}

function ArbeidslisteFooter(props: ArbeidslisteFooterProps) {
	return (
		<div className="modal-footer">
			<Hovedknapp htmlType="submit" className="btn--mr1">
				Lagre
			</Hovedknapp>
			<Knapp htmlType="button" onClick={props.onRequestClose}>
				Avbryt
			</Knapp>
			<HiddenIfFlatKnapp
				htmlType="button"
				hidden={!props.kanFjerneArbeidsliste}
				onClick={props.slettArbeidsliste}
				className="fjern--knapp"
			>
				<SlettIcon />
				<span>Fjern</span>
			</HiddenIfFlatKnapp>
		</div>
	);
}

export default ArbeidslisteFooter;
