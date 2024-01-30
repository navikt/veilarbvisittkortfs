import { Button, Modal } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    endreHuskelapp: () => void;
    slettHuskelapp: () => void;
}

export const HuskelappFooter = (props: ArbeidslisteFooterProps) => (
    <Modal.Footer>
        <Button size="small" variant="primary" form="huskelapp-form" onClick={props.endreHuskelapp}>
            Endre
        </Button>
        <Button
            size="small"
            variant="secondary"
            type="button"
            onClick={props.slettHuskelapp}
            icon={<TrashIcon aria-hidden />}
            tabIndex={0}
            autoFocus={true}
        >
            Slett
        </Button>
    </Modal.Footer>
);
