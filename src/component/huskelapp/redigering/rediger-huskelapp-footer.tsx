import { Button } from '@navikt/ds-react';

interface Props {
    onRequestClose: () => void;
    textPrimaryBtn: string;
}

export const RedigerHuskelappFooter = ({ onRequestClose, textPrimaryBtn }: Props) => (
    <>
        <Button size="small" variant="primary" form="huskelapp-form" type="submit">
            {textPrimaryBtn}
        </Button>
        <Button size="small" variant="secondary" type="button" onClick={onRequestClose}>
            Avbryt
        </Button>
    </>
);
