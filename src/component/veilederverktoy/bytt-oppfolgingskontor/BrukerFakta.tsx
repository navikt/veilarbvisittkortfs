import { BodyShort, Heading, Skeleton } from '@navikt/ds-react';
import { KontorTilhorigheter } from '../../../api/ao-oppfolgingskontor';

interface Props {
    navn: string;
    hentAlleKontorLoading: boolean;
    kontorTilhorighet: KontorTilhorigheter | null;
}

const getKontorNavn = (kontor: { kontorId: string; kontorNavn: string } | undefined) => {
    if (!kontor) return '-';
    return `${kontor?.kontorId} - ${kontor?.kontorNavn}`;
};

export const BrukerFakta = ({ hentAlleKontorLoading, navn, kontorTilhorighet }: Props) => {
    return (
        <div className="space-y-2 p-4 rounded-lg border border-border-default bg-surface-subtle">
            <div className="mb-2">
                <Heading size={'small'}>Fakta om bruker</Heading>
            </div>
            <dl>
                <div className="flex space-x-2">
                    <BodyShort weight="semibold" as={'dt'}>
                        Navn:
                    </BodyShort>
                    <BodyShort as={'dd'}>{navn}</BodyShort>
                </div>
                <div className="flex space-x-2">
                    <BodyShort as="dt" weight="semibold">
                        Folkeregistrert adresse:
                    </BodyShort>
                    <BodyShort as={'dd'}>Fyrstikkalleen 1, Fyrstikkalleen 1, , Fyrstikkalleen 1, </BodyShort>
                </div>
                <div className="flex space-x-2">
                    <BodyShort as={'dt'} weight="semibold">
                        Arenakontor:
                    </BodyShort>
                    {hentAlleKontorLoading ? (
                        <Skeleton width={100} />
                    ) : (
                        <BodyShort as={'dd'}>{getKontorNavn(kontorTilhorighet?.arena)}</BodyShort>
                    )}
                </div>
                <div className="flex space-x-2">
                    <BodyShort as={'dt'} weight="semibold">
                        Geografisk enhet:
                    </BodyShort>
                    {hentAlleKontorLoading ? (
                        <Skeleton width={100} />
                    ) : (
                        <BodyShort as={'dd'}>{getKontorNavn(kontorTilhorighet?.geografiskTilknytning)}</BodyShort>
                    )}
                </div>
                <div className="flex space-x-2">
                    <BodyShort as={'dt'} weight="semibold">
                        Arbeidsrettet oppfølging:
                    </BodyShort>
                    {hentAlleKontorLoading ? (
                        <Skeleton width={100} />
                    ) : (
                        <BodyShort as={'dd'}>{getKontorNavn(kontorTilhorighet?.arbeidsoppfolging)}</BodyShort>
                    )}
                </div>
            </dl>
        </div>
    );
};
