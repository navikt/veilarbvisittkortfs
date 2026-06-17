import { GlobalAlert } from '@navikt/ds-react';

export const KontorIkkeSattAlert = () => {
    return (
        <GlobalAlert status="warning">
            <GlobalAlert.Header>
                <GlobalAlert.Title>Kontor kan ikke endres manuelt enda</GlobalAlert.Title>
            </GlobalAlert.Header>
            <GlobalAlert.Content>
                Kontor kan ikke endres manuelt før automatisk tilordning av kontor er ferdig. Vi trenger informasjon om
                adresser og profilering, og det kan ta noen minutter før det er klart.
            </GlobalAlert.Content>
        </GlobalAlert>
    );
};
