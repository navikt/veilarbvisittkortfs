import { Alert, BodyShort, Button } from '@navikt/ds-react';
import { KvittertKontor } from '../../../api/ao-oppfolgingskontor';
import { ArrowRightIcon } from '@navikt/aksel-icons';

export interface KontorSkiftetKvittering {
    fraKontor: KvittertKontor;
    tilKontor: KvittertKontor;
}

export const ByttOppfolgingskontorKvittering = ({ kvittering }: { kvittering: KontorSkiftetKvittering }) => {
    return (
        <div className="space-y-4">
            <div className="mt-4 flex space-x-4 items-center">
                <BodyShort size={'large'} aria-label="Flyttet fra kontor">
                    {kvittering.fraKontor.kontorNavn}
                </BodyShort>
                <ArrowRightIcon title="a11y-title" fontSize="2rem" aria-hidden="true" />
                <BodyShort size={'large'} aria-label="Flyttet til kontor">
                    {kvittering.tilKontor.kontorNavn}
                </BodyShort>
            </div>
            <Alert variant="success" size={'small'}>
                <BodyShort>Bytte av oppfølgingskontor er registrert</BodyShort>
            </Alert>
            <Button size="small" variant="primary">
                Lukk
            </Button>
        </div>
    );
};
