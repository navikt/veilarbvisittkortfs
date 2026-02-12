import { ExpansionCard, HStack, Skeleton } from '@navikt/ds-react';
import { ClockDashedIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { KontorEndringsType, KontorHistorikkEntry, KontorType } from '../../../api/ao-oppfolgingskontor';
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
                                className="first:rounded-t-lg last:rounded-b-lg p-2 odd:bg-gray-50 "
                                key={historikkEntry.endretTidspunkt}
                            >
                                <div className="flex flex-row grid grid-flow-col grid-cols-12">
                                    <span className="col-span-5 space-x-2 flex flex-col">
                                        <span className="">
                                            <span className="font-bold">{historikkEntry.kontorId}</span> -{' '}
                                            {historikkEntry.kontorNavn}
                                        </span>
                                    </span>
                                    <span className="col-span-4">{kontorTypeNavn[historikkEntry.kontorType]}</span>

                                    <span className="col-span-3">
                                        {dayjs(historikkEntry.endretTidspunkt).fromNow()}
                                    </span>
                                </div>
                                <div>
                                    <EndretAv
                                        isLoading={veilederListeLoading}
                                        navn={getNavn(historikkEntry, veilederIdentTilNavnMapping)}
                                    />
                                </div>
                                <div className="text-gray-700">{endringstypeTekst[historikkEntry.endringsType]}</div>
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
            <span className="text-gray-700 flex space-x-4">
                <span>Endret av:</span>
                <Skeleton variant="text" width={'40%'} />
            </span>
        );
    }
    return <span className="text-gray-700">Endret av: {navn}</span>;
};

const endringstypeTekst: Record<KontorEndringsType, string> = {
    AddressebeskyttelseMistet: 'Bruker fikk nytt geografisk kontor fordi hen ikke lenger er adressebeskyttet',
    ArenaKontorFraOppfolgingsbrukerVedOppfolgingStart: 'Brukers kontor i Arena ved start oppfølging',
    ArenaKontorHentetSynkrontVedOppfolgingsStart: 'Brukers kontor i Arena ved start oppfølging',
    ArenaKontorManuellSynk: 'Bruker kontor i Arena (synkronisert manuelt av )',
    ArenaKontorVedOppfolgingStartMedEtterslep: 'Brukers kontor i Arena ved start oppfølging',
    ArenaKontorVedOppfolgingsStart: 'Brukers kontor i Arena ved start oppfølging',
    AutomatiskNorgRuting: 'Bruker ble rutet til lokalkontor ved hjelp av NORG',
    AutomatiskNorgRutingFallback: 'Bruker ble rutet til NAV-IT fordi det ikke ble funnet et passende kontor',
    AutomatiskRutetTilNOE: 'Bruker ble rutet til NOE på grunn av alder og profilering',
    AutomatiskRutetTilNavItGtErLand: 'Bruker ble rutet til NAV-IT fordi det ikke ble funnet et passende kontor',
    AutomatiskRutetTilNavItIngenKontorFunnetForGt:
        'Bruker ble rutet til NAV-IT fordi det ikke ble funnet et passende kontor',
    AutomatiskRutetTilNavItManglerGt: 'Bruker ble rutet til NAV-IT fordi det ikke ble funnet et passende kontor',
    AutomatiskRutetTilNavItUgyldigGt: 'Bruker ble rutet til NAV-IT fordi det ikke ble funnet et passende kontor',
    AutomatiskRutingArbeidsgiverFallback:
        'Bruker fikk lokalkontor basert på arbeidsgivers adresse (ingen norsk adresse funnet)',
    EndretBostedsadresse: 'Bruker endret bostedsadresse',
    EndretIArena: 'Kontoret ble endret i Arena',
    FikkAddressebeskyttelse: 'Bruker fikk adressebeskyttelse',
    FikkSkjerming: 'Bruker ble skjermet',
    FlyttetAvVeileder: 'Bruker ble manuelt flyttet av en veileder',
    GTKontorVedOppfolgingStart: 'Brukers geografiske kontor ved start oppfølging',
    MIGRERING: 'Kontor ble migrert fra Arena',
    MistetSkjerming: 'Bruker er ikke lenger skjermet',
    PATCH: 'Kontor ble migrert fra Arena',
    StartKontorSattManueltAvVeileder: 'Kontor ble manuelt satt av en veileder ved start oppfølging',
    TidligArenaKontorVedOppfolgingStart: 'Brukers kontor i Arena ved start av oppfølging'
};

export default KontorHistorikk;
