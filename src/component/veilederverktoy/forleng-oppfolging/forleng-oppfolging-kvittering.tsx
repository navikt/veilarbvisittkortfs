import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react';
import dayjs from 'dayjs';

export interface OppfolgingForlengetTilKvitering {
    forlengetTil: Date;
}

export interface ForlengOppfolgingKvitteringProps {
    kvittering: OppfolgingForlengetTilKvitering;
    tilbake: () => void;
}

export const ForlengOppfolgingKvittering = ({ kvittering, tilbake }: ForlengOppfolgingKvitteringProps) => {
    return (
        <>
            <Modal.Body>
                <div className="space-y-4">
                    <Alert variant="success" size={'small'}>
                        <BodyShort>
                            Oppfølging forlenget til{' '}
                            <strong>{dayjs(kvittering.forlengetTil).format('DD.MM.YYYY')}</strong>
                        </BodyShort>
                    </Alert>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button size="small" variant="primary" onClick={tilbake}>
                    Lukk
                </Button>
            </Modal.Footer>
        </>
    );
};
