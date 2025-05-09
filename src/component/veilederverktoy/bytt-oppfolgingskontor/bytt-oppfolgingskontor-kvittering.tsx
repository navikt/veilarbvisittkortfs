import { Heading, TextField } from '@navikt/ds-react';
import { Kontor } from '../../../api/ao-oppfolgingskontor';

export interface KontorSkiftetKvittering {
    fraKontor: Kontor;
    tilKontor: Kontor;
}

export const ByttOppfolgingskontorKvittering = ({ kvittering }: { kvittering: KontorSkiftetKvittering }) => {
    return (
        <div className="bytt-oppfolgingskontor-kvittering">
            <Heading size={'small'}>Bytte av oppfølgingskontor er registrert</Heading>
            <div className="space-y-4">
                <TextField
                    value={`${kvittering.fraKontor.kontorId} - ${kvittering.fraKontor.navn}`}
                    label={'Gammelt kontor'}
                    readOnly
                />
                <TextField
                    value={`${kvittering.tilKontor.kontorId} - ${kvittering.tilKontor.navn}`}
                    label={'Nytt kontor'}
                    readOnly
                />
            </div>
        </div>
    );
};
