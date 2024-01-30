import { useModalStore } from '../../../store/modal-store';
import { Button } from '@navikt/ds-react';
import './begrunnelse-form.less';

interface BegrunnelseFooterProps {
    spinner: boolean;
    disabled?: boolean;
}

function BegrunnelseFooter(props: BegrunnelseFooterProps) {
    const { hideModal } = useModalStore();
    return (
        <div className="begrunnelse-form-footer">
            <Button
                variant="primary"
                size="small"
                type="submit"
                loading={props.spinner}
                className="bekreft-btn"
                disabled={props.disabled}
            >
                Bekreft
            </Button>
            <Button variant="secondary" size="small" onClick={hideModal}>
                Avbryt
            </Button>
        </div>
    );
}

export default BegrunnelseFooter;
