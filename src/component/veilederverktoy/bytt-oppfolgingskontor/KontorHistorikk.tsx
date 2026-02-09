import { ExpansionCard, HStack, Skeleton } from '@navikt/ds-react';
import { ClockDashedIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { KontorHistorikkEntry, KontorType } from '../../../api/ao-oppfolgingskontor';
import { useVeilederDataListe, VeilederData } from '../../../api/veilarbveileder';

interface Props {
    kontorHistorikk: KontorHistorikkEntry[];
}

const kontorTypeNavn: Record<KontorType, string> = {
    GEOGRAFISK_TILKNYTNING: 'GT-kontor',
    ARENA: 'Arena',
    ARBEIDSOPPFOLGING: 'Arbeidsoppfolgingskontor'
};

export const KontorHistorikk = ({ kontorHistorikk }: Props) => {
    const veilederIdenter = kontorHistorikk.filter(it => it.endretAvType === 'VEILEDER').map(it => it.endretAv);
    const { veilederListeLoading, veilederListeData } = useVeilederDataListe(
        veilederIdenter.length ? veilederIdenter : null
    );
    const veilederIdentTilNavnMapping =
        veilederListeData?.reduce(
            (acc, veilederData: VeilederData) => {
                return {
                    ...acc,
                    [veilederData.ident]: veilederData.navn
                };
            },
            {} as Record<string, string>
        ) || ({} as Record<string, string>);

    return (
        <ExpansionCard size="small" className="mt-4 mb-4" aria-labelledby="Kontorhistorikk">
            <ExpansionCard.Header>
                <HStack gap="4" align="center">
                    <ClockDashedIcon />
                    <ExpansionCard.Title size="small">Kontorhistorikk</ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div className="">
                    {kontorHistorikk.map(historikkEntry => {
                        return (
                            <div
                                className="first:rounded-t-lg last:rounded-b-lg grid p-2 odd:bg-gray-50 grid-flow-col grid-cols-12"
                                key={historikkEntry.endretTidspunkt}
                            >
                                <span className="col-span-5 space-x-2 flex flex-col">
                                    <span className="">
                                        <span className="font-bold">{historikkEntry.kontorId}</span> -{' '}
                                        {historikkEntry.kontorNavn}
                                    </span>
                                    <EndretAv
                                        isLoading={veilederListeLoading}
                                        navn={getNavn(historikkEntry, veilederIdentTilNavnMapping)}
                                    />
                                </span>
                                <span className="col-span-4">{kontorTypeNavn[historikkEntry.kontorType]}</span>

                                <span className="col-span-3">{dayjs(historikkEntry.endretTidspunkt).fromNow()}</span>
                            </div>
                        );
                    })}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

const getNavn = (historikkEntry: KontorHistorikkEntry, veilederIdentTilNavnMapping: Record<string, string>): string => {
    if (historikkEntry.endretAvType == 'VEILEDER') {
        const veilederNavn = veilederIdentTilNavnMapping[historikkEntry.endretAv];
        return veilederNavn ? `${veilederNavn} (${historikkEntry.endretAv})` : historikkEntry.endretAv;
    } else if (historikkEntry.endretAvType == 'BRUKER') {
        return 'Bruker';
    } else if (historikkEntry.endretAvType == 'SYSTEM') {
        return 'Arena';
    } else {
        return `${historikkEntry.endretAv} (${historikkEntry.endretAvType})`;
    }
};

const EndretAv = ({ isLoading, navn }: { isLoading: boolean; navn: string }) => {
    if (isLoading) {
        return (
            <span className="text-gray-700">
                <Skeleton variant="text" />
            </span>
        );
    }
    return <span className="text-gray-700">Endret av: {navn}</span>;
};

export default KontorHistorikk;
