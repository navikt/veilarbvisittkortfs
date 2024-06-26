import { Alert } from '@navikt/ds-react';
import VeilederVerktoyModal from '../../components/modal/veilederverktoy-modal';

export function FeilModal() {
    return (
        <VeilederVerktoyModal tittel="Noe gikk galt">
            <Alert variant="error">Vi beklager, men det ser ut som noe gikk galt. Prøv igjen senere.</Alert>
        </VeilederVerktoyModal>
    );
}
