import { Button } from '@navikt/ds-react';

interface Props {
    onRequestClose: () => void;
    onActionClick?: () => void;
    textPrimaryBtn: string;
}

export const HuskelappFooter = ({ onRequestClose, onActionClick, textPrimaryBtn }: Props) => (
    <>
        <Button
            size="small"
            variant="primary"
            form="huskelapp-form"
            type="submit"
            tabIndex={0}
            autoFocus={true}
            onClick={onActionClick}
        >
            {textPrimaryBtn}
        </Button>
        <Button size="small" variant="secondary" type="button" onClick={onRequestClose}>
            Avbryt
        </Button>
    </>
);
