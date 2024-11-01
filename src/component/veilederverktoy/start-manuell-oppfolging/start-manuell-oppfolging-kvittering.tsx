import { Alert } from '@navikt/ds-react';
import Kvittering from '../prosess/kvittering';

export interface StartManuellOppfolgingKvitteringProps {
    begrunnelse: string;
}

function StartManuellOppfolgingKvittering({ begrunnelse }: StartManuellOppfolgingKvitteringProps) {
    return (
        <Kvittering
            tittel="Endre til manuell oppfølging"
            alertStripeTekst={`Endring til manuell oppfølging er gjennomført. Begrunnelse: ${begrunnelse}`}
            footer={
                <Alert variant="warning" size="small">
                    Brukere som ikke kan legge inn CV og jobbprofil selv skal få hjelp til dette.
                </Alert>
            }
        />
    );
}

export default StartManuellOppfolgingKvittering;
