import { ExpansionCard, HStack } from '@navikt/ds-react';
import { ClockDashedIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { KontorHistorikkEntry, KontorType } from '../../../api/ao-oppfolgingskontor';

interface Props {
    kontorHistorikk: KontorHistorikkEntry[];
}

const kontorTypeNavn: Record<KontorType, string> = {
    GEOGRAFISK_TILKNYTNING: 'GT-kontor',
    ARENA: 'Arena',
    ARBEIDSOPPFOLGING: 'Arbeidsoppfolgingskontor'
};

export const KontorHistorikk = ({ kontorHistorikk }: Props) => {
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
                                    <span className="text-gray-700">
                                        Endret av: {historikkEntry.endretAv} ({historikkEntry.endretAvType})
                                    </span>
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

export default KontorHistorikk;
