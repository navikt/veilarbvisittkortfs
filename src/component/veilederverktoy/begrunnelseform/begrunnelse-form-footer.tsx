import React from 'react';
import { useModalStore } from '../../../store/modal-store';
import { Button } from '@navikt/ds-react';

interface BegrunnelseFooterProps {
    spinner: boolean;
    disabled?: boolean;
}

function BegrunnelseFooter(props: BegrunnelseFooterProps) {
    const { hideModal } = useModalStore();
    return (
        <div className="modal-footer">
            <Button
                variant="primary"
                type="submit"
                spinner={props.spinner}
                autoDisableVedSpinner={true}
                className="btn--mr1"
                disabled={props.disabled}
            >
                Bekreft
            </Button>
            <Button variant="secondary" onClick={hideModal}>
                Avbryt
            </Button>
        </div>
    );
}

export default BegrunnelseFooter;
