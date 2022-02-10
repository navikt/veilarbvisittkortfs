import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { useModalStore } from '../../../store/modal-store';

interface BegrunnelseFooterProps {
	spinner: boolean;
	disabled?: boolean;
}

function BegrunnelseFooter(props: BegrunnelseFooterProps) {
	const { hideModal } = useModalStore();
	return (
		<div className="modal-footer">
			<Hovedknapp
				htmlType="submit"
				spinner={props.spinner}
				autoDisableVedSpinner={true}
				className="btn--mr1"
				disabled={props.disabled}
			>
				Bekreft
			</Hovedknapp>
			<Knapp onClick={hideModal}>Avbryt</Knapp>
		</div>
	);
}

export default BegrunnelseFooter;
