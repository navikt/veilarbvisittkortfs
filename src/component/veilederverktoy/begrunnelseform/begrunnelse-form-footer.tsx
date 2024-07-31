import { Button } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';
import './begrunnelse-form.less';

interface Props {
    spinner: boolean;
    disabled?: boolean;
}

function BegrunnelseFooter({ spinner, disabled }: Props) {
    const { hideModal } = useModalStore();

    return (
        <div className="begrunnelse-form-footer">
            <Button
                variant="primary"
                size="small"
                type="submit"
                loading={spinner}
                className="bekreft-btn"
                disabled={disabled}
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
