import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import VeilederVerktoyModal from '../veilederverktoy-modal';

export function FeilModal() {
    return (
        <VeilederVerktoyModal>
            <AlertStripe solid={true} className="blokk-m" type="stopp">
                Vi beklager, men det ser ut som noe gikk galt. Systemet er nede. Prøv igjen senere.
            </AlertStripe>
        </VeilederVerktoyModal>
    );
}