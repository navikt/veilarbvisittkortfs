import { HiddenIfFlatKnapp } from '../components/hidden-if/hidden-if-knapp';
import { ReactComponent as SlettIcon } from '../components/ikoner/slett.svg';
import { Button } from '@navikt/ds-react';
import React from 'react';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    slettHuskelapp: () => void;
    kanFjerneHuskelapp: boolean;
}

function HuskelappFooter(props: ArbeidslisteFooterProps) {
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
            <Button size={'small'} variant={'primary'} htmlType="submit" form={'huskelapp-form'}>
                Lagre og slett eksisterende
            </Button>
            <HiddenIfFlatKnapp
                // @ts-ignore
                htmlType="button"
                hidden={!props.kanFjerneHuskelapp}
                onClick={props.slettHuskelapp}
                className="fjern--knapp"
            >
                <SlettIcon />
                <span>Fjern</span>
            </HiddenIfFlatKnapp>
        </div>
    );
}

export default HuskelappFooter;
