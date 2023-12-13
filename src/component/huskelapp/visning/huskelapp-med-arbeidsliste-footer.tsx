import { Button } from '@navikt/ds-react';
import React from 'react';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    lagHuskelapp: () => void;
}

function HuskelappMedArbeidslisteFooter(props: ArbeidslisteFooterProps) {
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
            <Button size={'small'} variant={'primary'} form={'huskelapp-form'} onClick={props.lagHuskelapp}>
                Lag huskelapp
            </Button>
        </div>
    );
}

export default HuskelappMedArbeidslisteFooter;
