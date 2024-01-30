import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';

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
            {props.kanFjerneArbeidsliste && (
                <Button
                    type="button"
                    onClick={props.slettArbeidsliste}
                    icon={<TrashIcon />}
                    variant="tertiary"
                    size="small"
                    className="fjern--knapp"
                >
                    Fjern
                </Button>
            )}
        </div>
    );
}

export default ArbeidslisteFooter;
