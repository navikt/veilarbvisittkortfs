import { BodyShort, Heading, HelpText, Skeleton } from '@navikt/ds-react';
import { KontorTilhorigheter } from '../../../api/ao-oppfolgingskontor';

interface Props {
    navn: string;
    hentAlleKontorLoading: boolean;
    kontorTilhorighet: KontorTilhorigheter | null;
}

const getKontorNavn = (kontor: { kontorId: string; kontorNavn: string } | undefined) => {
    if (!kontor) return '-';
    return `${kontor?.kontorId} ${kontor?.kontorNavn}`;
};

export const BrukerFakta = ({ hentAlleKontorLoading, navn, kontorTilhorighet }: Props) => {
    return (
        <div className="space-y-2 pb-4 bg-surface-alt-3-subtle p-4 rounded-lg">
            <div className="mb-2">
                <Heading size={'small'}>Fakta om bruker</Heading>
            </div>
            <dl>
                <div className="flex space-x-2 mb-4">
                    <BodyShort weight="semibold" as={'dt'}>
                        Navn:
                    </BodyShort>
                    <BodyShort as={'dd'}>{navn}</BodyShort>
                </div>
                <div className="pl-4 flex flex-col flex-wrap gap-4">
                    <div className="flex border-b pb-2 space-x-2 flex-col border-surface-alt-3-moderate">
                        <BodyShort className="text-gray-700" as={'dt'} weight="semibold">
                            Arbeidsrettet-oppfølgings-kontor
                        </BodyShort>
                        {hentAlleKontorLoading ? (
                            <Skeleton width={100} />
                        ) : (
                            <BodyShort as={'dd'}>{getKontorNavn(kontorTilhorighet?.arbeidsoppfolging)}</BodyShort>
                        )}
                    </div>
                    <div className="flex border-b pb-2 border-surface-alt-3-moderate space-x-2 flex-col">
                        <BodyShort className="text-gray-700" as={'dt'} weight="semibold">
                            Arenakontor
                        </BodyShort>
                        {hentAlleKontorLoading ? (
                            <Skeleton width={100} />
                        ) : (
                            <BodyShort as={'dd'}>{getKontorNavn(kontorTilhorighet?.arena)}</BodyShort>
                        )}
                    </div>
                    <div className="flex pb-2 space-x-2 flex-col">
                        <div className="flex gap-2 items-center">
                            <BodyShort className="text-gray-700" as={'dt'} weight="semibold">
                                Geografisk tilknyttet kontor
                            </BodyShort>
                            <HelpText>Samme som "Geografisk enhet"</HelpText>
                        </div>
                        {hentAlleKontorLoading ? (
                            <Skeleton width={100} />
                        ) : (
                            <BodyShort as={'dd'}>{getKontorNavn(kontorTilhorighet?.geografiskTilknytning)}</BodyShort>
                        )}
                    </div>
                </div>
            </dl>
        </div>
    );
};
