import { HiddenIfFlatKnapp } from '../components/hidden-if/hidden-if-knapp';
import { ReactComponent as SlettIcon } from '../components/ikoner/slett.svg';
import React from 'react';
import { Button } from '@navikt/ds-react';

interface ArbeidslisteFooterProps {
    onRequestClose: () => void;
    slettArbeidsliste: () => void;
    kanFjerneArbeidsliste: boolean;
}

function ArbeidslisteFooter(props: ArbeidslisteFooterProps) {
    return (
        <div className="modal-footer">
            <Button variant="primary" size="small" type="submit" className="bekreft-btn">
                Lagre
            </Button>
            <Button variant="secondary" size="small" type="button" onClick={props.onRequestClose}>
                Avbryt
            </Button>
            <HiddenIfFlatKnapp
                type="button"
                hidden={!props.kanFjerneArbeidsliste}
                onClick={props.slettArbeidsliste}
                className="fjern--knapp"
            >
                <SlettIcon />
                <span>Fjern</span>
            </HiddenIfFlatKnapp>
        </div>
    );
}

export default ArbeidslisteFooter;
