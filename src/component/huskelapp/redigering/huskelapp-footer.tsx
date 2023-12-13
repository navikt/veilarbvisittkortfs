import { Button } from '@navikt/ds-react';
import React from 'react';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    slettHuskelapp: () => void;
}

function HuskelappFooter(props: ArbeidslisteFooterProps) {
    return (
        <div className="huskelapp-modal-footer">
            <Button
                size={'small'}
                variant={'secondary'}
                htmlType="button"
                className="btn--mr1"
                onClick={props.onRequestClose}
            >
                Avbryt
            </Button>
            <Button size={'small'} variant={'primary'} htmlType="submit" form={'huskelapp-form'}>
                Lagre
            </Button>
        </div>
    );
}

export default HuskelappFooter;
