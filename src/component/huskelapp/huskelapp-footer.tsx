import React from 'react';
import {Button} from '@navikt/ds-react';

interface Props {
    onRequestClose: () => void;
    onActionClick?: () => void;
    textPrimaryBtn: string;
    typePrimaryBtn: "button" | "submit"
}

export const HuskelappFooter = ({onRequestClose, onActionClick, textPrimaryBtn, typePrimaryBtn}: Props) => (
    <div className="huskelapp-modal-footer">
        <Button
            size="small"
            variant="secondary"
            type="button"
            onClick={onRequestClose}
        >
            Avbryt
        </Button>
        <Button
            size="small"
            variant="primary"
            form="huskelapp-form"
            type={typePrimaryBtn}
            tabIndex={0}
            autoFocus={true}
            onClick={onActionClick}
        >
            {textPrimaryBtn}
        </Button>
    </div>
);
