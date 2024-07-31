import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';

interface Props {
    onRequestClose: () => void;
    slettArbeidsliste: () => void;
    kanFjerneArbeidsliste: boolean;
}

function ArbeidslisteFooter({ onRequestClose, slettArbeidsliste, kanFjerneArbeidsliste }: Props) {
    return (
        <div className="modal-footer">
            <Button variant="primary" size="small" type="submit" className="bekreft-btn">
                Lagre
            </Button>
            <Button variant="secondary" size="small" type="button" onClick={onRequestClose}>
                Avbryt
            </Button>
            {kanFjerneArbeidsliste && (
                <Button
                    type="button"
                    onClick={slettArbeidsliste}
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
