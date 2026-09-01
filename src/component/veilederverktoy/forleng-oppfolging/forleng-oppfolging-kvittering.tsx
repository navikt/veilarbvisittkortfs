import { useModalStore } from '../../../store/modal-store';
import { Alert, BodyShort, Button } from '@navikt/ds-react';

export interface OppfolgingForlengetTilKvitering {
    forlengetTil: Date;
}

export const ForlengOppfolgingKvittering = ({ kvittering }: { kvittering: OppfolgingForlengetTilKvitering }) => {
    const { hideModal } = useModalStore();

    return (
        <div className="space-y-4">
            <Alert variant="success" size={'small'}>
                <BodyShort>
                    Oppfølging forlenget til <strong>{kvittering.forlengetTil.toISOString()}</strong>
                </BodyShort>
            </Alert>
            <Button size="small" variant="primary" onClick={hideModal}>
                Lukk
            </Button>
        </div>
    );
};
