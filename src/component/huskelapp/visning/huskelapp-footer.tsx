import { Button } from '@navikt/ds-react';
import React from 'react';
import { TrashIcon } from '@navikt/aksel-icons';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    endreHuskelapp: () => void;
    slettHuskelapp: () => void;
}

export const HuskelappFooter = (props: ArbeidslisteFooterProps) => (
    <div className="huskelapp-modal-footer">
        <Button
            size="small"
            variant="tertiary"
            type="button"
            className="btn--mr1"
            onClick={props.slettHuskelapp}
            icon={<TrashIcon aria-hidden />}
            tabIndex={0}
            autoFocus={true}
        >
            Slett
        </Button>
        <Button size="small" variant="primary" form="huskelapp-form" onClick={props.endreHuskelapp}>
            Endre
        </Button>
    </div>
);
