import { Button } from '@navikt/ds-react';
import React from 'react';
import CheckIcon from '@navikt/ds-react/esm/form/combobox/FilteredOptions/CheckIcon';

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
                type="button"
                className="btn--mr1"
                onClick={props.slettHuskelapp}
                icon={<CheckIcon aria-hidden />}
            >
                Marker som ferdig
            </Button>
            <Button
                size={'small'}
                variant={'primary'}
                form={'huskelapp-form'}
                onClick={props.endreHuskelapp}
                tabIndex={0}
            >
                Endre
            </Button>
        </div>
    );
}

export default HuskelappFooter;
