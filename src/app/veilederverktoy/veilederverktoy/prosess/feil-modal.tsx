import React from 'react';
import AlertStripeFeil from 'nav-frontend-alertstriper';
import VeilederVerktoyModal from '../veilederverktoy-modal';

export function FeilModal() {
    return (
        <VeilederVerktoyModal>
            <AlertStripeFeil solid={true} className="blokk-m" type="feil">
                Vi beklager, men det ser ut som noe gikk galt. Systemet er nede. Prøv igjen senere.
            </AlertStripeFeil>
        </VeilederVerktoyModal>
    );
}