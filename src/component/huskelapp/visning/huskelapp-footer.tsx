import {Button} from '@navikt/ds-react';
import React from 'react';
import CheckIcon from '@navikt/ds-react/esm/form/combobox/FilteredOptions/CheckIcon';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    endreHuskelapp: () => void;
    slettHuskelapp: () => void;
}

export const HuskelappFooter = (props: ArbeidslisteFooterProps) => (
    <div className="huskelapp-modal-footer">
        <Button
            size="small"
            variant="secondary"
            type="button"
            className="btn--mr1"
            onClick={props.slettHuskelapp}
            icon={<CheckIcon aria-hidden/>}
            tabIndex={0}
            autoFocus={true}
        >
            Marker som ferdig
        </Button>
        <Button size="small" variant="primary" form="huskelapp-form" onClick={props.endreHuskelapp}>
            Endre
        </Button>
    </div>
);
