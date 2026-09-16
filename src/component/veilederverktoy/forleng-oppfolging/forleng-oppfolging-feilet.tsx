import { Alert, BodyShort, Button, Modal } from '@navikt/ds-react';

export interface OppfolgingForlengelseFeiletProps {
    tilbake: () => void;
}

export const OppfolgingForlengelseFeilet = ({ tilbake }: OppfolgingForlengelseFeiletProps) => {
    return (
        <>
            <Modal.Body>
                <div className="space-y-4">
                    <Alert variant="error" size={'small'}>
                        <BodyShort>Handling kunne ikke utføres.</BodyShort>
                    </Alert>
                    <BodyShort size="small">
                        Forlengelse av oppfølging feilet. Det kan skyldes manglende tilgang til brukeren, eller at krav
                        til forlengelse ikke er oppfylt. Prøv igjen senere eller kontakt brukerstøtte dersom problemet
                        vedvarer.
                    </BodyShort>
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
