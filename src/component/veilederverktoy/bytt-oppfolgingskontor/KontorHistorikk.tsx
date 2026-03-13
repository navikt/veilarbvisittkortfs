import { ExpansionCard, HStack, Skeleton, Tabs } from '@navikt/ds-react';
import { ClockDashedIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { KontorEndringsType, KontorHistorikkEntry } from '../../../api/ao-oppfolgingskontor';
import { useVeilederDataListe, VeilederData } from '../../../api/veilarbveileder';

interface Props {
    kontorHistorikk: KontorHistorikkEntry[];
}

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
    const arbeidsoppfolgingskontorHistorikk = kontorHistorikk.filter(it => it.kontorType === 'ARBEIDSOPPFOLGING');
    const gtkontorHistorikk = kontorHistorikk.filter(it => it.kontorType === 'GEOGRAFISK_TILKNYTNING');
    const arenakontorHistorikk = kontorHistorikk.filter(it => it.kontorType === 'ARENA');

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
                    <Tabs defaultValue="arbeidsoppfolgingskontor" fill={true}>
                        <Tabs.List>
                            <Tabs.Tab value="arbeidsoppfolgingskontor" label="Arbeidsoppfølgingskontor" />
                            <Tabs.Tab value="gtkontor" label="GT-kontor" />
                            <Tabs.Tab value="arenakontor" label="Arena-kontor" />
                        </Tabs.List>
                        <Tabs.Panel value="arbeidsoppfolgingskontor">
                            {arbeidsoppfolgingskontorHistorikk.length > 0 ? (
                                arbeidsoppfolgingskontorHistorikk.map(historikkEntry => {
                                    return KontorHistorikkInnslag(
                                        historikkEntry,
                                        veilederListeLoading,
                                        veilederIdentTilNavnMapping
                                    );
                                })
                            ) : (
                                <p className="mt-2 text-gray-600">Ingen endringer for arbeidsoppfølgingskontor</p>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="gtkontor">
                            {gtkontorHistorikk.length > 0 ? (
                                gtkontorHistorikk.map(historikkEntry => {
                                    return KontorHistorikkInnslag(
                                        historikkEntry,
                                        veilederListeLoading,
                                        veilederIdentTilNavnMapping
                                    );
                                })
                            ) : (
                                <p className="mt-2 text-gray-600">Ingen endringer for GT-kontor</p>
                            )}
                        </Tabs.Panel>
                        <Tabs.Panel value="arenakontor">
                            {arenakontorHistorikk.length > 0 ? (
                                arenakontorHistorikk.map(historikkEntry => {
                                    return KontorHistorikkInnslag(
                                        historikkEntry,
                                        veilederListeLoading,
                                        veilederIdentTilNavnMapping
                                    );
                                })
                            ) : (
                                <p className="mt-2 text-gray-600">Ingen endringer for Arena-kontor</p>
                            )}
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

const KontorHistorikkInnslag = (
    historikkEntry: KontorHistorikkEntry,
    veilederListeLoading: boolean,
    veilederIdentTilNavnMapping: Record<string, string>
) => {
    return (
        <div className="first:rounded-t-lg last:rounded-b-lg p-2 odd:bg-gray-50 " key={historikkEntry.endretTidspunkt}>
            <div className="flex flex-row grid grid-flow-col grid-cols-12">
                <span className="col-span-8 space-x-2 flex flex-col">
                    <span className="">
                        <span className="font-bold">{historikkEntry.kontorId}</span> - {historikkEntry.kontorNavn}
                    </span>
                </span>
                <span className="col-span-4">{dayjs(historikkEntry.endretTidspunkt).fromNow()}</span>
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
};

const getNavn = (historikkEntry: KontorHistorikkEntry, veilederIdentTilNavnMapping: Record<string, string>): string => {
    if (historikkEntry.endretAvType == 'VEILEDER') {
        const veilederNavn = veilederIdentTilNavnMapping[historikkEntry.endretAv];
        return veilederNavn ? `${veilederNavn} (${historikkEntry.endretAv})` : historikkEntry.endretAv;
    } else if (historikkEntry.endretAvType == 'BRUKER') {
        return 'Bruker';
    } else if (historikkEntry.endretAvType == 'SYSTEM') {
        if (historikkEntry.endretAv == 'PDL') {
            return 'Persondataløsningen';
        } else if (historikkEntry.endretAv == 'SKJERMING') {
            return 'Skjermingsløsningen';
        } else if (historikkEntry.endretAv == 'VEILARBOPPFOLGING') {
            return 'Modia arbeidsrettet oppfølging';
        } else {
            return 'Arena';
        }
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
    ArenaKontorFraOppfolgingsbrukerVedOppfolgingStart: 'Brukers kontor i Arena ved start av oppfølging',
    ArenaKontorHentetSynkrontVedOppfolgingsStart: 'Brukers kontor i Arena ved start av oppfølging',
    ArenaKontorManuellSynk: 'Bruker kontor i Arena (synkronisert manuelt av )',
    ArenaKontorVedOppfolgingStartMedEtterslep: 'Brukers kontor i Arena ved start av oppfølging',
    ArenaKontorVedOppfolgingsStart: 'Brukers kontor i Arena ved start av oppfølging',
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
    GTKontorVedOppfolgingStart: 'Brukers geografiske kontor ved start av oppfølging',
    MIGRERING: 'Kontor ble migrert fra Arena',
    MistetSkjerming: 'Bruker er ikke lenger skjermet',
    PATCH: 'Kontor ble migrert fra Arena',
    StartKontorSattManueltAvVeileder: 'Kontor ble manuelt satt av en veileder ved start av oppfølging',
    TidligArenaKontorVedOppfolgingStart: 'Brukers kontor i Arena ved start av oppfølging'
};

export default KontorHistorikk;
