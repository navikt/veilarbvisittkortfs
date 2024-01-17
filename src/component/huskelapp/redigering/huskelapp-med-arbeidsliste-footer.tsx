import { Button } from '@navikt/ds-react';
import React from 'react';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    slettHuskelapp: () => void;
}

function HuskelappMedArbeidslisteFooter(props: ArbeidslisteFooterProps) {
    return (
        <div className="huskelapp-modal-footer">
            <Button
                size={'small'}
                variant={'secondary'}
                type="button"
                className="btn--mr1"
                onClick={props.onRequestClose}
            >
                Avbryt
            </Button>
            <Button size={'small'} variant={'primary'} htmlType="submit" form={'huskelapp-form'} tabIndex={0}>
                Lagre og slett eksisterende
            </Button>
        </div>
    );
}

export default HuskelappMedArbeidslisteFooter;
