import { Button } from '@navikt/ds-react';
import React from 'react';
import { TrashIcon } from '@navikt/aksel-icons';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    endreHuskelapp: () => void;
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
                onClick={props.slettHuskelapp}
                icon={<TrashIcon aria-hidden />}
            >
                Slett
            </Button>
            <Button size={'small'} variant={'primary'} form={'huskelapp-form'} onClick={props.endreHuskelapp}>
                Endre
            </Button>
        </div>
    );
}

export default HuskelappFooter;
